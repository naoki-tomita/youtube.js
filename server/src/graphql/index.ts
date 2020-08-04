import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { Resolvers, Author } from "../generated/graphql";
import { readFile } from "fs";
import { join } from "path";
import { VideoUsecase } from "../usecases/VideoUsecase";
import { AuthorUsecase } from "../usecases/AuthorUsecase";
import { Language } from "../Language";
import { createProgressiveDownload } from "./ExpressProgressiveDownload";
import ffmpeg from "fluent-ffmpeg";
import { Writable } from "stream";

async function readFileAsync(path: string) {
  return new Promise<string>((ok, ng) => readFile(path, (err, data) => err ? ng(err) : ok(data.toString())));
}

function toVideo({
  id, title = "", description = "", authorId
}: {
  id: string;
  title?: string;
  description?: string;
  authorId: string;
  createdAt: Date;
}) {
  return ({ id, title, description, author: { id: authorId } as Author })
}

function toAuthor({
  id, name, description
}: {
  id: string;
  name?: string;
  description?: string;
}) {
  return { id, name: name ?? "", description, videos: [] };
}

async function main() {

  const videoUsecase = new VideoUsecase();
  const authorUsecase = new AuthorUsecase();
  const resolvers: Resolvers = {
    Query: {
      async videos(...[,, { language }]) {
        return (await videoUsecase.list(Language.find(language))).map(toVideo);
      },
      async authors(...[,, { language }]) {
        return (await authorUsecase.list(Language.find(language))).map(toAuthor);
      },
      async video(_, { id }, { language }) {
        const entry = await videoUsecase.findBy(id, Language.find(language));
        return entry && toVideo(entry);
      }
    },
    Video: {
      async author(...[video,, { language }]) {
        return toAuthor((await authorUsecase.findBy(video.author.id, Language.find(language)))!);
      }
    },
    Author: {
      async videos(...[author,, { language }]) {
        return (await videoUsecase.findByAuthorId(author.id, Language.find(language))).map(toVideo);
      }
    }
  };

  const schema = await readFileAsync(join(__dirname, "../../graphql/schema.graphql"));
  const typeDefs = gql(schema);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers: resolvers as any,
    context: ({ req }) => ({
      language: parseAcceptLanguage(req.headers["accept-language"] ?? "")[0] || "en-US",
    }),
  });

  const app = express();
  app.get("/v1/videos/:id", createProgressiveDownload(async (req) => {
    const { id } = req.params;
    const video = await videoUsecase.findBy(id || "", Language.enUS);
    return video?.filePath ?? null;
  }));
  app.get("/v1/thumbnails/:id", async (req, res) => {
    const { id } = req.params;
    const video = await videoUsecase.findBy(id || "", Language.enUS);
    if (!video) {
      return res.status(404).end();
    }

    try {
      ffmpeg(video.filePath)
        .output(res)
        .outputOptions("-ss", "0", "-vframes", "1")
        .size("200x?")
        .format("image2")
        .on("error", (e) => {
          console.error(e);
          res.status(500).end();
        })
        .run();
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });

  apollo.applyMiddleware({ app, cors: true })
  const server = app.listen(8081, () => { console.log(`Server started.`) });
}

function parseAcceptLanguage(acceptLanguage: string) {
  return acceptLanguage
    .split(",")
    .map(item => item.split(";"))
    .sort(([, a = "1"], [, b]) => parseFloat(a) - parseFloat(b))
    .map(([item]) => item);
}

main();
