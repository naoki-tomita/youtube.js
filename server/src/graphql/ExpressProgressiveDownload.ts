import { Request, Response } from "express";
import { stat, createReadStream, Stats } from "fs";
import { extname } from "path";

function readFileStatus(path: string) {
  return new Promise<Stats>((ok, ng) => stat(path, (err, status) => err ? ng(err) : ok(status)));
}

function getContentType(fileName: string) {
  const ext = extname(fileName);
  switch (ext) {
    case ".mp4":
      return "video/mp4";
    case ".html":
    case ".htm":
      return "text/html";
    default:
      return "text/plain";
  }
}

function parseRange(rangeStr: string) {
  const [, range] = rangeStr.split("=");
  const [start, end] = range.split("-").map(x => parseInt(x, 10));
  return {
    start: isNaN(start) ? 0 : start,
    end: isNaN(end) ? undefined : end,
  };
}

export function createProgressiveDownload(
  filePathResolver: (req: Request) => Promise<string | null> | string | null
) {
  return async function(req: Request, res: Response) {
    try {
      const path = await filePathResolver(req);
      if (path == null) {
        return res.writeHead(404).end(JSON.stringify({ error: "File not found." }));
      }
      const rangeStr = req.headers.range ?? "bytes=0-";
      const range = parseRange(rangeStr);

      const { size } = await readFileStatus(path);
      const { start = 0, end = size - 1 } = range;
      const contentLength = end - start + 1;

      const stream = createReadStream(path, { start, end });
      stream.on("open", () =>
        res.writeHead(206, {
          "accept-ranges": "bytes",
          "content-type": getContentType(path),
          "content-range": `bytes ${start}-${end}/${size}`,
          "content-length": contentLength,
        })
      );
      stream.on("data", (d) => res.write(d));
      stream.on("close", () => res.end());
      stream.on("error", (e) => (res.end()));
    } catch (e) {
      console.error(e);
      res.status(500).end(JSON.stringify({ error: e.stack }));
    }
  }
}
