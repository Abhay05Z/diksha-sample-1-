import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const frames = 72;
const size = 900;

function ringSvg(index) {
  const t = (index / frames) * Math.PI * 2;
  const face = Math.cos(t);
  const sx = 0.16 + 0.84 * Math.abs(face);
  const rx = 168 * sx;
  const gemX = 450 + Math.sin(t) * 92;
  const gemY = 292;
  const front = face >= 0;
  const gem = `
    <g transform="translate(${gemX} ${gemY})" opacity="${front ? 1 : 0.35}">
      <polygon points="0,-46 34,-8 22,36 -22,36 -34,-8" fill="url(#gem)"/>
      <polygon points="0,-46 34,-8 0,-4" fill="#ffffff" opacity="0.72"/>
      <polygon points="0,-4 22,36 -22,36" fill="#9eb0b8" opacity="0.35"/>
      <polygon points="0,-46 -34,-8 0,-4" fill="#ffffff" opacity="0.28"/>
    </g>`;
  const band = `
    <ellipse cx="450" cy="430" rx="${rx}" ry="168" fill="none" stroke="url(#gold)" stroke-width="${front ? 22 : 28}"/>
    <ellipse cx="450" cy="424" rx="${Math.max(rx - 8, 4)}" ry="160" fill="none" stroke="#f6e7c4" stroke-width="2" opacity="${0.35 + 0.25 * Math.abs(face)}"/>
    <ellipse cx="450" cy="438" rx="${Math.max(rx - 6, 4)}" ry="162" fill="none" stroke="#6d542c" stroke-width="3" opacity="0.28"/>
  `;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F4E4C4"/>
      <stop offset="42%" stop-color="#C6A15B"/>
      <stop offset="100%" stop-color="#7A5E32"/>
    </linearGradient>
    <linearGradient id="gem" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="48%" stop-color="#E4EEF1"/>
      <stop offset="100%" stop-color="#8EA4AE"/>
    </linearGradient>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(48,37,31,0.22)"/>
      <stop offset="70%" stop-color="rgba(48,37,31,0.05)"/>
      <stop offset="100%" stop-color="rgba(48,37,31,0)"/>
    </radialGradient>
  </defs>
  <ellipse cx="450" cy="690" rx="${120 + rx * 0.55}" ry="18" fill="url(#shadow)"/>
  ${front ? band + gem : gem + band}
</svg>`;
}

function necklaceSvg(index) {
  const t = (index / frames) * Math.PI * 2;
  const face = Math.cos(t);
  const sx = 0.22 + 0.78 * Math.abs(face);
  const rx = 210 * sx;
  const swing = Math.sin(t) * 46;
  const front = face >= 0;
  const chain = `
    <ellipse cx="450" cy="300" rx="${rx}" ry="118" fill="none" stroke="url(#gold)" stroke-width="7"/>
    <ellipse cx="450" cy="294" rx="${Math.max(rx - 6, 8)}" ry="112" fill="none" stroke="#f3e4c2" stroke-width="1.5" opacity="0.45"/>
  `;
  const pendant = `
    <g transform="translate(${450 + swing} 455)">
      <rect x="-4" y="-36" width="8" height="22" rx="2" fill="#C6A15B"/>
      <circle cx="0" cy="8" r="34" fill="url(#gold)"/>
      <circle cx="0" cy="8" r="22" fill="none" stroke="#f6e7c4" stroke-width="2" opacity="0.7"/>
      <circle cx="-8" cy="0" r="6" fill="#fff" opacity="0.35"/>
    </g>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F6E7C8"/>
      <stop offset="50%" stop-color="#C6A15B"/>
      <stop offset="100%" stop-color="#7C6133"/>
    </linearGradient>
    <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(48,37,31,0.2)"/>
      <stop offset="100%" stop-color="rgba(48,37,31,0)"/>
    </radialGradient>
  </defs>
  <ellipse cx="${450 + swing}" cy="640" rx="${90 + rx * 0.25}" ry="16" fill="url(#shadow)"/>
  ${front ? chain + pendant : pendant + chain}
</svg>`;
}

async function writeSequence(folder, draw) {
  const dir = path.join(process.cwd(), "public/assets/360/image-sequences", folder);
  await mkdir(dir, { recursive: true });
  for (let i = 0; i < frames; i += 1) {
    const name = `frame-${String(i + 1).padStart(3, "0")}.webp`;
    await sharp(Buffer.from(draw(i)))
      .webp({ quality: 78, alphaQuality: 90 })
      .toFile(path.join(dir, name));
    if ((i + 1) % 12 === 0) console.log(folder, i + 1);
  }
}

await writeSequence("demo-ring", ringSvg);
await writeSequence("demo-necklace", necklaceSvg);
console.log("Turntables ready");
