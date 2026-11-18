import { readdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const root = path.join(process.cwd(), "public", "assets");
const files = (await walk(root)).filter((file) => /\.(jpe?g|png)$/i.test(file));

for (const file of files) {
  try {
    const meta = await sharp(file, { failOn: "none" }).metadata();
    if (!meta.width || !meta.format) {
      console.log("SKIP", file);
      continue;
    }
    const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
    await sharp(file)
      .rotate()
      .resize({ width: Math.min(meta.width, 1800), withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(out);
    await unlink(file);
    console.log("WEBP", path.relative(process.cwd(), out), meta.width, meta.height);
  } catch (error) {
    console.log("FAIL", file, String(error));
  }
}
