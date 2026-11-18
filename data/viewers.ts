export type SequenceId = "demo-ring" | "demo-necklace";

export type Turntable = {
  id: SequenceId;
  frames: number;
  kind: "generated-demo";
  label: string;
  frameSrc: (frame: number) => string;
};

const pad = (frame: number) => String(frame).padStart(3, "0");

export const turntables: Record<SequenceId, Turntable> = {
  "demo-ring": {
    id: "demo-ring",
    frames: 72,
    kind: "generated-demo",
    label: "Generated ring turntable, made so the viewer can be used before photography exists. It is not a photograph of a showroom piece.",
    frameSrc: (frame) => `/assets/360/image-sequences/demo-ring/frame-${pad(frame)}.webp`,
  },
  "demo-necklace": {
    id: "demo-necklace",
    frames: 72,
    kind: "generated-demo",
    label: "Generated necklace turntable for the same reason. Replace the folder with photographs of one piece, named frame-001 onwards.",
    frameSrc: (frame) => `/assets/360/image-sequences/demo-necklace/frame-${pad(frame)}.webp`,
  },
};

export const demoModel = {
  url: "/assets/360/glb/demo-gold-ring.glb",
  sourceName: "Grab3D",
  sourceUrl: "https://grab3d.com/models/props/ring/",
  license: "CC0 1.0",
  label:
    "CC0 demonstration file. It is a small stylised ring from Grab3D, not a Jewellery Store Sample piece and not a photograph.",
};
