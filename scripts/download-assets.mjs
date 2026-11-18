import { createWriteStream } from "node:fs";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const root = process.cwd();

const pexels = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`;

const jobs = [
  ["public/assets/products/ring-solitaire.jpg", pexels(14466162), "https://www.pexels.com/photo/close-up-shot-of-a-diamond-ring-on-white-surface-14466162/"],
  ["public/assets/products/ring-sparkle.jpg", pexels(2849742), "https://www.pexels.com/photo/close-up-photo-of-ring-2849742/"],
  ["public/assets/products/ring-engagement.jpg", pexels(15871491), "https://www.pexels.com/photo/wedding-ring-with-a-diamond-15871491/"],
  ["public/assets/products/earrings-hoop-book.jpg", pexels(12144990), "https://www.pexels.com/photo/close-up-photo-of-gold-earrings-12144990/"],
  ["public/assets/products/earrings-hoop-white.jpg", pexels(16038197), "https://www.pexels.com/photo/close-up-of-earrings-16038197/"],
  ["public/assets/products/bridal-red.jpg", pexels(28347078), "https://www.pexels.com/photo/elegant-traditional-bridal-jewelry-set-display-28347078/"],
  ["public/assets/products/bridal-ivory.jpg", pexels(32077588), "https://www.pexels.com/photo/elegant-bridal-jewelry-set-in-ahmedabad-32077588/"],
  ["public/assets/products/gold-flatlay.jpg", pexels(29502924), "https://www.pexels.com/photo/elegant-gold-jewelry-set-with-necklace-and-earrings-29502924/"],
  ["public/assets/products/gold-ginkgo.jpg", pexels(29503018), "https://www.pexels.com/photo/elegant-gold-jewelry-set-with-ginkgo-leaf-design-29503018/"],
  ["public/assets/products/silver-black.jpg", pexels(31459472), "https://www.pexels.com/photo/elegant-silver-jewelry-set-on-black-background-31459472/"],
  ["public/assets/products/diamond-box.jpg", pexels(7093174), "https://www.pexels.com/photo/diamond-silver-necklace-and-earrings-in-black-box-7093174/"],
  ["public/assets/products/bangles-dark.jpg", pexels(37485309), "https://www.pexels.com/photo/intricate-gold-bangles-on-dark-background-37485309/"],
  ["public/assets/products/kundan-set.jpg", pexels(33154729), "https://www.pexels.com/photo/traditional-indian-kundan-jewelry-set-with-earrings-33154729/"],
  ["public/assets/products/pendant-velvet.jpg", pexels(34399028), "https://www.pexels.com/photo/elegant-gold-pendant-set-in-red-velvet-box-34399028/"],
  ["public/assets/products/pearl-diamond.jpg", pexels(37467312), "https://www.pexels.com/photo/luxurious-pearl-necklace-with-diamond-pendant-37467312/"],
  ["public/assets/products/pearl-pendants.jpg", pexels(28985983), "https://www.pexels.com/photo/elegant-gold-pendants-with-pearl-accents-28985983/"],
  ["public/assets/products/baroque-pearl.jpg", pexels(34372553), "https://www.pexels.com/photo/elegant-baroque-pearl-necklace-with-gold-chain-34372553/"],
  ["public/assets/products/gold-pendant.jpg", pexels(4595723), "https://www.pexels.com/photo/shiny-golden-pendant-on-chain-on-reflecting-table-4595723/"],
  ["public/assets/editorial/bridal-portrait.jpg", pexels(30929038), "https://www.pexels.com/photo/elegant-indian-bridal-jewelry-close-up-30929038/"],
  ["public/assets/editorial/gold-adornment.jpg", pexels(10944923), "https://www.pexels.com/photo/close-up-shot-of-a-woman-in-gold-jewelries-10944923/"],
  ["public/assets/editorial/bangles-hands.jpg", pexels(7875019), "https://www.pexels.com/photo/a-person-wearing-gold-bangles-and-rings-7875019/"],
  ["public/assets/editorial/heritage-display.jpg", pexels(39797490), "https://www.pexels.com/photo/traditional-indian-jewelry-and-accessories-display-39797490/"],
  ["public/assets/editorial/velvet-necklace.jpg", "https://unsplash.com/photos/re1oHeWEPjI/download?force=true&w=2000", "https://unsplash.com/photos/gold-necklace-and-earrings-displayed-on-black-velvet-re1oHeWEPjI"],
  ["public/assets/editorial/diamond-rectangle.jpg", "https://unsplash.com/photos/OLMF4bJr6S4/download?force=true&w=2000", "https://unsplash.com/photos/a-gold-necklace-with-a-rectangular-diamond-pendant-OLMF4bJr6S4"],
  ["public/assets/editorial/white-pendant.jpg", "https://unsplash.com/photos/JXqIHKyJaeI/download?force=true&w=2000", "https://unsplash.com/photos/gold-round-pendant-necklace-on-white-textile-JXqIHKyJaeI"],
  ["public/assets/editorial/two-tone-necklace.jpg", "https://unsplash.com/photos/FmxVkJx3_2Y/download?force=true&w=2000", "https://unsplash.com/photos/a-silver-and-gold-necklace-on-a-white-background-FmxVkJx3_2Y"],
  ["public/assets/editorial/red-stone-bangles.jpg", "https://unsplash.com/photos/zz6-LqiW4mY/download?force=true&w=2000", "https://unsplash.com/photos/gold-and-diamond-studded-bracelet-zz6-LqiW4mY"],
  ["public/assets/360/glb/demo-gold-ring.glb", "https://grab3d.com/dl/ring/ring.glb", "https://grab3d.com/models/props/ring/"],
];

const results = [];

for (const [file, url, source] of jobs) {
  const dest = path.join(root, file);
  await mkdir(path.dirname(dest), { recursive: true });
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: AbortSignal.timeout(45000),
      headers: {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
    });
    if (!response.ok || !response.body) {
      results.push({ file, url, source, ok: false, status: response.status });
      console.log("FAIL", response.status, file);
      continue;
    }
    await pipeline(Readable.fromWeb(response.body), createWriteStream(dest));
    const info = await stat(dest);
    const ok = info.size > 8000 || file.endsWith(".glb");
    results.push({ file, url, source, ok, bytes: info.size, type: response.headers.get("content-type") });
    console.log(ok ? "OK" : "SMALL", info.size, file);
  } catch (error) {
    results.push({ file, url, source, ok: false, error: String(error) });
    console.log("ERROR", file, String(error));
  }
}

await mkdir(path.join(root, "data"), { recursive: true });
const { writeFile } = await import("node:fs/promises");
await writeFile(path.join(root, "data", "download-log.json"), JSON.stringify(results, null, 2));
const failed = results.filter((item) => !item.ok).length;
console.log(`Done. ${results.length - failed} ok, ${failed} failed.`);
