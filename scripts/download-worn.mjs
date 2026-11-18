import { createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import sharp from "sharp";

const jobs = [
  ["wear-necklace", "10347064"],
  ["wear-traditional", "14062404"],
  ["wear-bride", "10958645"],
  ["wear-tika", "11817504"],
  ["wear-sari", "12642990"],
  ["wear-bangles", "33209405"],
  ["wear-close", "10495177"],
  ["wear-bridal-gold", "27155540"],
  ["wear-earrings", "10283311"],
  ["wear-face", "12996631"],
];

const dir = path.join(process.cwd(), "public", "assets", "worn");
await mkdir(dir, { recursive: true });

for (const [name, id] of jobs) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  const tmp = path.join(dir, `${name}.tmp`);
  const out = path.join(dir, `${name}.webp`);
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(40000),
      headers: { "user-agent": "Mozilla/5.0", accept: "image/jpeg,image/webp,image/*" },
    });
    if (!response.ok || !response.body) {
      console.log("FAIL", response.status, name);
      continue;
    }
    await pipeline(Readable.fromWeb(response.body), createWriteStream(tmp));
    const info = await stat(tmp);
    if (info.size < 8000) {
      console.log("SMALL", name, info.size);
      continue;
    }
    await sharp(tmp).rotate().resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    console.log("OK", name, info.size);
  } catch (error) {
    console.log("ERROR", name, String(error));
  }
}
