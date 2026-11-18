export const conceptIds = ["concept-1", "concept-2", "concept-3", "concept-4"] as const;

export type ConceptId = (typeof conceptIds)[number];

export type ConceptKey = "maison" | "noir" | "atelier" | "heritage";

export type Concept = {
  id: ConceptId;
  key: ConceptKey;
  name: string;
  eyebrow: string;
  summary: string;
  hero: string;
  preview: string;
};

export const concepts: Record<ConceptId, Concept> = {
  "concept-1": {
    id: "concept-1",
    key: "maison",
    name: "The Royal Maison",
    eyebrow: "Concept 01",
    summary: "Timeless Indian luxury. Warm ivory, champagne gold and an editorial maison layout.",
    hero: "Jewellery That Becomes Your Legacy.",
    preview: "/assets/editorial/gold-adornment.webp",
  },
  "concept-2": {
    id: "concept-2",
    key: "noir",
    name: "Noir Luxe",
    eyebrow: "Concept 02",
    summary: "Contemporary high jewellery. Matte black, warm white and cinematic product photography.",
    hero: "An Expression Beyond Ordinary.",
    preview: "/assets/products/silver-black.webp",
  },
  "concept-3": {
    id: "concept-3",
    key: "atelier",
    name: "The Modern Atelier",
    eyebrow: "Concept 03",
    summary: "Minimal contemporary luxury. Soft cream, quiet type and a calm boutique grid.",
    hero: "Every Detail. A Little Extraordinary.",
    preview: "/assets/products/ring-solitaire.webp",
  },
  "concept-4": {
    id: "concept-4",
    key: "heritage",
    name: "The Heritage Collection",
    eyebrow: "Concept 04",
    summary: "Indian royal heritage. Deep burgundy, antique gold and bridal craft, without ornamental clutter.",
    hero: "Tradition, Crafted to Last Forever.",
    preview: "/assets/products/bridal-red.webp",
  },
};

export function isConceptId(value: string): value is ConceptId {
  return (conceptIds as readonly string[]).includes(value);
}
