/**
 * SAMPLE CATALOGUE
 * Every product below uses licensed stock photography.
 * Nothing here is confirmed Diksha Jewellers inventory.
 * Prices, karat, weight and diamond grades are intentionally absent.
 * Replace images, names and codes when the showroom supplies its own pieces.
 */

export type Product = {
  slug: string;
  name: string;
  code: string;
  summary: string;
  description: string;
  collections: string[];
  material: string;
  images: { src: string; alt: string }[];
  sequenceId?: "demo-ring" | "demo-necklace";
  featured?: boolean;
  sample: true;
  purity: string | null;
  weight: string | null;
  price: string | null;
  stones: string | null;
};

const blank = { purity: null, weight: null, price: null, stones: null, sample: true as const };

export const products: Product[] = [
  {
    ...blank,
    slug: "sample-solitaire-ring",
    name: "Sample Solitaire Ring",
    code: "SAMPLE-RG-01",
    summary: "A gold solitaire study on a quiet white ground.",
    description:
      "A sample photograph of a solitaire ring, used to show how a ring can be presented on the website. Metal purity, carat weight and availability are not stated, because they have not been verified for Diksha Jewellers.",
    collections: ["rings", "diamond", "statement"],
    material: "Diamond jewellery",
    featured: true,
    sequenceId: "demo-ring",
    images: [{ src: "/assets/products/ring-solitaire.webp", alt: "Sample gold solitaire ring on a white surface." }],
  },
  {
    ...blank,
    slug: "sample-marble-ring",
    name: "Sample Marble Diamond Ring",
    code: "SAMPLE-RG-02",
    summary: "A diamond ring photographed on marble.",
    description:
      "Sample product photography for the diamond edit. The image is a layout study. It is not a coded piece from the showroom.",
    collections: ["rings", "diamond"],
    material: "Diamond jewellery",
    images: [{ src: "/assets/products/ring-sparkle.webp", alt: "Sample diamond ring on a marble surface." }],
  },
  {
    ...blank,
    slug: "sample-gold-diamond-ring",
    name: "Sample Gold Diamond Ring",
    code: "SAMPLE-RG-03",
    summary: "A gold ring with a diamond setting, seen close.",
    description:
      "A sample close study of a gold diamond ring. Size and stone details are left for a conversation at the showroom.",
    collections: ["rings", "diamond", "gold"],
    material: "Gold and diamond jewellery",
    featured: true,
    images: [{ src: "/assets/products/ring-engagement.webp", alt: "Sample gold engagement ring with diamonds." }],
  },
  {
    ...blank,
    slug: "sample-page-hoops",
    name: "Sample Gold Hoops",
    code: "SAMPLE-ER-01",
    summary: "Gold hoops in a softer, everyday light.",
    description:
      "Sample hoop earrings for the everyday edit. Finish and weight are not specified.",
    collections: ["earrings", "gold", "everyday"],
    material: "Gold jewellery",
    images: [{ src: "/assets/products/earrings-hoop-book.webp", alt: "Sample gold hoop earrings on an open book." }],
  },
  {
    ...blank,
    slug: "sample-textured-hoops",
    name: "Sample Textured Hoops",
    code: "SAMPLE-ER-02",
    summary: "Textured gold hoops on white.",
    description:
      "A second hoop study, so the earrings collection is not a single repeated photograph.",
    collections: ["earrings", "gold", "everyday"],
    material: "Gold jewellery",
    featured: true,
    images: [{ src: "/assets/products/earrings-hoop-white.webp", alt: "Sample textured gold hoop earrings on white." }],
  },
  {
    ...blank,
    slug: "sample-crimson-bridal-set",
    name: "Sample Crimson Bridal Set",
    code: "SAMPLE-BR-01",
    summary: "A stone-set bridal necklace and earrings on red.",
    description:
      "Sample bridal photography. The set is not described as kundan or polki unless a future photograph is actually of that work. Ask the showroom to see bridal jewellery in person.",
    collections: ["bridal", "necklace-sets", "earrings", "statement", "gold"],
    material: "Gold jewellery",
    featured: true,
    images: [{ src: "/assets/products/bridal-red.webp", alt: "Sample bridal necklace and earrings on a red ground." }],
  },
  {
    ...blank,
    slug: "sample-ivory-bridal-set",
    name: "Sample Ivory Bridal Set",
    code: "SAMPLE-BR-02",
    summary: "An Indian bridal set in a lighter setting.",
    description:
      "A second bridal study from Ahmedabad photography, used only as a sample. It is not Diksha Jewellers stock.",
    collections: ["bridal", "necklace-sets", "earrings", "statement"],
    material: "Bridal jewellery",
    sequenceId: "demo-necklace",
    images: [{ src: "/assets/products/bridal-ivory.webp", alt: "Sample Indian bridal necklace set." }],
  },
  {
    ...blank,
    slug: "sample-gold-ensemble",
    name: "Sample Gold Ensemble",
    code: "SAMPLE-GD-01",
    summary: "Necklace, earrings, bracelet and ring in one gold study.",
    description:
      "A flat lay used to show a gold ensemble. Individual specifications are not assigned to this sample.",
    collections: ["gold", "necklace-sets", "earrings", "bracelets"],
    material: "Gold jewellery",
    featured: true,
    images: [{ src: "/assets/products/gold-flatlay.webp", alt: "Sample gold jewellery set with necklace, earrings, bracelet and ring." }],
  },
  {
    ...blank,
    slug: "sample-ginkgo-set",
    name: "Sample Ginkgo Gold Set",
    code: "SAMPLE-GD-02",
    summary: "A light gold set with a leaf motif.",
    description:
      "A modern gold set included so the catalogue has more than one gold photograph. The leaf design is the photographer’s piece, shown as a sample.",
    collections: ["gold", "necklace-sets", "earrings", "bracelets", "everyday"],
    material: "Gold jewellery",
    images: [{ src: "/assets/products/gold-ginkgo.webp", alt: "Sample gold necklace, bracelet and earrings with a ginkgo leaf design." }],
  },
  {
    ...blank,
    slug: "sample-silver-evening-set",
    name: "Sample Silver Evening Set",
    code: "SAMPLE-SV-01",
    summary: "A white-metal set on black. The photograph’s source describes it as silver.",
    description:
      "Sample photography for the silver edit: necklace, earrings, ring and bracelet in a white metal with stones. It is not a verified Diksha Jewellers piece, and no purity is stated.",
    collections: ["silver", "necklace-sets", "earrings", "bracelets"],
    material: "Silver jewellery",
    featured: true,
    images: [{ src: "/assets/products/silver-black.webp", alt: "Sample silver necklace, earrings and ring on black." }],
  },
  {
    ...blank,
    slug: "sample-diamond-casket",
    name: "Sample Diamond Casket Set",
    code: "SAMPLE-DM-01",
    summary: "A diamond necklace and earrings in a dark box.",
    description:
      "Sample diamond-set photography. No diamond grade is attached, because none has been verified.",
    collections: ["diamond", "necklace-sets", "earrings", "statement"],
    material: "Diamond jewellery",
    images: [{ src: "/assets/products/diamond-box.webp", alt: "Sample diamond necklace and earrings displayed in a box." }],
  },
  {
    ...blank,
    slug: "sample-stone-bangles",
    name: "Sample Stone Bangles",
    code: "SAMPLE-BG-01",
    summary: "Ornate gold bangles with stone detail.",
    description:
      "A sample bangle photograph. Pairs, size and stone details are for the showroom to confirm.",
    collections: ["bangles", "gold", "statement"],
    material: "Gold jewellery",
    featured: true,
    images: [{ src: "/assets/products/bangles-dark.webp", alt: "Sample ornate gold bangles with stones on a dark surface." }],
  },
  {
    ...blank,
    slug: "sample-kundan-set",
    name: "Sample Kundan Set",
    code: "SAMPLE-KN-01",
    summary: "A kundan necklace and earrings with blue stones.",
    description:
      "Licensed sample photography of a kundan set. It is not presented as a Diksha Jewellers design, and it is not described as certified.",
    collections: ["kundan", "necklace-sets", "earrings", "statement"],
    material: "Kundan jewellery",
    images: [{ src: "/assets/products/kundan-set.webp", alt: "Sample kundan necklace and earrings with blue stones." }],
  },
  {
    ...blank,
    slug: "sample-velvet-pendant",
    name: "Sample Velvet Pendant Set",
    code: "SAMPLE-PD-01",
    summary: "A gold pendant and earrings in a velvet box.",
    description:
      "A sample pendant set. The original photograph includes a coloured ground; it is used as a product study, not as a brand colour.",
    collections: ["pendants", "earrings", "gold"],
    material: "Gold jewellery",
    images: [{ src: "/assets/products/pendant-velvet.webp", alt: "Sample gold pendant and earrings in a velvet box." }],
  },
  {
    ...blank,
    slug: "sample-pearl-diamond-necklace",
    name: "Sample Pearl Diamond Necklace",
    code: "SAMPLE-NK-01",
    summary: "Pearls with a diamond-set pendant.",
    description:
      "Sample necklace photography for the diamond and necklace edits. No carat or pearl grade is claimed.",
    collections: ["diamond", "necklace-sets", "pendants"],
    material: "Diamond jewellery",
    images: [{ src: "/assets/products/pearl-diamond.webp", alt: "Sample pearl necklace with a diamond pendant." }],
  },
  {
    ...blank,
    slug: "sample-pearl-pendants",
    name: "Sample Pearl Pendants",
    code: "SAMPLE-PD-02",
    summary: "Gold pendants with pearl detail, on a light ground.",
    description:
      "A light product study for the atelier concept and the pendant collection.",
    collections: ["pendants", "gold", "everyday"],
    material: "Gold jewellery",
    images: [{ src: "/assets/products/pearl-pendants.webp", alt: "Sample gold pendants with pearl accents on a light background." }],
  },
  {
    ...blank,
    slug: "sample-baroque-pearl",
    name: "Sample Baroque Pearl Pendant",
    code: "SAMPLE-CH-01",
    summary: "A baroque pearl on a fine gold chain.",
    description:
      "Sample chain and pendant photography. Length is not specified.",
    collections: ["pendants", "chains", "everyday"],
    material: "Gold jewellery",
    images: [{ src: "/assets/products/baroque-pearl.webp", alt: "Sample baroque pearl pendant on a gold chain." }],
  },
  {
    ...blank,
    slug: "sample-reflection-pendant",
    name: "Sample Reflection Pendant",
    code: "SAMPLE-CH-02",
    summary: "A gold pendant and chain on a reflective surface.",
    description:
      "A classic pendant study. It is sample photography, with no purity or weight attached.",
    collections: ["pendants", "chains", "gold", "everyday"],
    material: "Gold jewellery",
    images: [{ src: "/assets/products/gold-pendant.webp", alt: "Sample gold pendant necklace on a reflective table." }],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsIn(collection: string) {
  return products.filter((product) => product.collections.includes(collection));
}

export function relatedProducts(slug: string, limit = 3) {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((product) => product.slug !== slug && product.collections.some((item) => current.collections.includes(item)))
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return products;
  return products.filter((product) => {
    const haystack = [product.name, product.code, product.summary, product.material, product.collections.join(" ")]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
