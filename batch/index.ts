import { createWriteStream } from "fs";
import ytdl from "ytdl-core";
import { join } from "path";
import { spawn } from "child_process";
import { throttle } from "throttle-debounce";

function downloadVideo(id: string) {
  return new Promise((ok, ng) => {
    return ytdl(`https://www.youtube.com/watch?v=${id}`, {
      filter: (it) => it.itag === 137
    })
    .on("progress", throttle(500, true, (_, current, total) => console.log(`Video: ${current/total*100}%`)))
    .pipe(createWriteStream("./tmp/video.mp4"))
    .on("close", ok)
    .on("error", ng)
  })
}

function downloadAudio(id: string) {
  return new Promise((ok, ng) => {
    ytdl(`https://www.youtube.com/watch?v=${id}`, {
      filter: (it) => it.itag === 140
    })
    .on("progress", throttle(500, true, (_, current, total) => console.log(`Audio: ${current/total*100}%`)))
    .pipe(createWriteStream("./tmp/audio.mp3"))
    .on("close", ok)
    .on("error", ng)
  });
}

function toJson(str: string) {
  return str.split("\n").map(it => it.split("=")).reduce<{ frame: string, total_size: string }>((p, [key, value]) => ({ ...p, [key]: value }), {} as any);
}

function merge(dest: string, id: string) {
  return new Promise((ok, ng) => {
    spawn("ffmpeg", [
      "-i", "./tmp/video.mp4",
      "-i", "./tmp/audio.mp3",
      "-progress", "-",
      "-y", `${join(dest, `${id}.mp4`)}`]
    )
    .on("exit", () => (console.log("exit"), ok()))
    .on("error", (e) => (console.log("error", e), ng(e)))
    .on("message", (m) => (console.log("message", m)))
  });
}

async function main(dest: string) {
  const ids = ["OZpv_AcPCKg", "CJBpcPrLLJ8", "VL0Ghet2U90", "_Q86CWtBpSk", "fhkqCW_AyEE", "LSDx4htNfjs", "Xh_59yBpTcg"];
  for (const id of ids) {
    console.log("downloading...", id);
    await Promise.all([
      downloadVideo(id),
      downloadAudio(id)
    ]);
    console.log("downloaded", id);
    console.log("generating...", id);
    await merge(dest, id);
    console.log("generated", id);
  }
}

const destination = "/Users/naoki.tomita/Desktop/movies";

try {
  main(destination);
} catch (e) {
  console.log(e);
}
