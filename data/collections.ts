export type CollectionGroup = "metal" | "type" | "edit";

export type Collection = {
  slug: string;
  name: string;
  group: CollectionGroup;
  intro: string;
  image: string | null;
  imageAlt: string;
};

export const collections: Collection[] = [
  {
    slug: "gold",
    name: "Gold Jewellery",
    group: "metal",
    image: "/assets/products/gold-flatlay.webp",
    imageAlt: "Sample gold necklace, earrings, bracelet and ring arranged together.",
    intro:
      "Gold jewellery is part of the public description of Jewellery Store Sample. These photographs are sample studies for the website. They are not a list of what is in the showroom today.",
  },
  {
    slug: "diamond",
    name: "Diamond Jewellery",
    group: "metal",
    image: "/assets/products/ring-solitaire.webp",
    imageAlt: "Sample solitaire diamond ring on a white surface.",
    intro:
      "Diamond jewellery is mentioned in the showroom’s public listing. Grades, weights and prices are confirmed in person, and are not invented here.",
  },
  {
    slug: "silver",
    name: "Silver Jewellery",
    group: "metal",
    image: "/assets/products/silver-black.webp",
    imageAlt: "Sample silver necklace, earrings and ring on a black ground.",
    intro:
      "Silver jewellery is part of the showroom’s public offering. The set below is sample photography, useful for layout, and replaceable with the showroom’s own pieces.",
  },
  {
    slug: "bridal",
    name: "Bridal Jewellery",
    group: "edit",
    image: "/assets/products/bridal-red.webp",
    imageAlt: "Sample bridal necklace and earrings against a deep red ground.",
    intro:
      "Bridal jewellery is presented as a way to begin a visit: necklaces, earrings and sets to see together. Availability is confirmed at B-66, LS Nagar Road.",
  },
  {
    slug: "kundan",
    name: "Kundan Jewellery",
    group: "edit",
    image: "/assets/products/kundan-set.webp",
    imageAlt: "Sample kundan necklace and earrings with blue stones.",
    intro:
      "Kundan is included as a proposed collection. The photograph is a licensed sample, not a claim that this exact set is in stock.",
  },
  {
    slug: "polki",
    name: "Polki Jewellery",
    group: "edit",
    image: null,
    imageAlt: "",
    intro:
      "Polki is a proposed category for the website. No photograph has been labelled polki, because the picture should match the jewellery. Ask the showroom which polki designs can be seen in Jaipur.",
  },
  {
    slug: "necklace-sets",
    name: "Necklace Sets",
    group: "type",
    image: "/assets/products/bridal-ivory.webp",
    imageAlt: "Sample Indian bridal necklace set.",
    intro: "Necklace sets, shown as sample studies. Pairings and availability are discussed at the showroom.",
  },
  {
    slug: "earrings",
    name: "Earrings",
    group: "type",
    image: "/assets/products/earrings-hoop-white.webp",
    imageAlt: "Sample textured gold hoop earrings on a white surface.",
    intro: "Earrings for a closer look, from everyday hoops to pieces that belong with a set.",
  },
  {
    slug: "rings",
    name: "Rings",
    group: "type",
    image: "/assets/products/ring-engagement.webp",
    imageAlt: "Sample gold ring set with diamonds.",
    intro: "Rings photographed as sample product studies. Size, metal and stone details are confirmed in the showroom.",
  },
  {
    slug: "bangles",
    name: "Bangles",
    group: "type",
    image: "/assets/products/bangles-dark.webp",
    imageAlt: "Sample ornate gold bangles on a dark surface.",
    intro: "Bangles, presented as a sample. The showroom can advise on pairs currently available.",
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    group: "type",
    image: "/assets/products/gold-ginkgo.webp",
    imageAlt: "Sample gold set including a bracelet, necklace and earrings.",
    intro:
      "Bracelet photography in this preview appears within gold sets. A dedicated bracelet catalogue can replace these studies.",
  },
  {
    slug: "mangalsutra",
    name: "Mangalsutra",
    group: "type",
    image: null,
    imageAlt: "",
    intro:
      "Mangalsutra is a proposed category. Photography has not been added, so this page does not pretend to show one. Send a WhatsApp message to ask what can be viewed.",
  },
  {
    slug: "pendants",
    name: "Pendants",
    group: "type",
    image: "/assets/products/gold-pendant.webp",
    imageAlt: "Sample gold pendant on a chain, photographed on a reflective surface.",
    intro: "Pendants and chains for a quieter edit. Each image is a sample, not a coded showroom piece.",
  },
  {
    slug: "chains",
    name: "Chains",
    group: "type",
    image: "/assets/products/baroque-pearl.webp",
    imageAlt: "Sample baroque pearl pendant on a gold chain.",
    intro: "Chains appear here with their pendants. Length and metal are confirmed when you visit or write to the showroom.",
  },
  {
    slug: "statement",
    name: "Statement Jewellery",
    group: "edit",
    image: "/assets/editorial/bridal-portrait.webp",
    imageAlt: "Sample editorial photograph of Indian bridal jewellery being worn.",
    intro: "Pieces with a stronger presence, gathered as a sample edit for weddings and festive dressing.",
  },
  {
    slug: "everyday",
    name: "Everyday Jewellery",
    group: "edit",
    image: "/assets/products/earrings-hoop-book.webp",
    imageAlt: "Sample gold hoop earrings resting on an open book.",
    intro: "Quieter gold and pearl studies for daily wear. A sample edit, ready to be replaced with showroom photography.",
  },
];

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export const collectionGroups: { id: CollectionGroup; label: string }[] = [
  { id: "metal", label: "Metals" },
  { id: "type", label: "Jewellery" },
  { id: "edit", label: "Edits" },
];
