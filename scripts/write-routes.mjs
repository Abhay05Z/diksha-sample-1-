import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const concepts = [
  {
    id: "concept-1",
    home: "MaisonHome",
    from: "@/components/concepts/maison/HomePage",
    title: "The Royal Maison",
    description: "A timeless ivory and champagne presentation of Diksha Jewellers, a jewellery showroom in Vidyadhar Nagar, Jaipur.",
    fonts: `import { Cormorant_Garamond, Jost } from "next/font/google";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });`,
  },
  {
    id: "concept-2",
    home: "NoirHome",
    from: "@/components/concepts/noir/HomePage",
    title: "Noir Luxe",
    description: "A cinematic black and warm-ivory presentation of Diksha Jewellers, Jaipur, with gold, silver and diamond jewellery studies.",
    fonts: `import { Bodoni_Moda, Manrope } from "next/font/google";

const display = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });`,
  },
  {
    id: "concept-3",
    home: "AtelierHome",
    from: "@/components/concepts/atelier/HomePage",
    title: "The Modern Atelier",
    description: "A minimal cream boutique presentation of Diksha Jewellers in Vidyadhar Nagar, Jaipur.",
    fonts: `import { Figtree, Newsreader } from "next/font/google";

const display = Newsreader({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });`,
  },
  {
    id: "concept-4",
    home: "HeritageHome",
    from: "@/components/concepts/heritage/HomePage",
    title: "The Heritage Collection",
    description: "A burgundy and antique-gold presentation of Diksha Jewellers, Jaipur, with bridal and traditional jewellery studies.",
    fonts: `import { Fraunces, Source_Sans_3 } from "next/font/google";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });`,
  },
];

const root = process.cwd();

for (const concept of concepts) {
  const base = path.join(root, "app", concept.id);
  await mkdir(path.join(base, "collections", "[slug]"), { recursive: true });
  await mkdir(path.join(base, "product", "[slug]"), { recursive: true });
  await mkdir(path.join(base, "experience-360", "[slug]"), { recursive: true });
  await mkdir(path.join(base, "about"), { recursive: true });
  await mkdir(path.join(base, "contact"), { recursive: true });
  await mkdir(path.join(base, "search"), { recursive: true });

  await writeFile(
    path.join(base, "layout.tsx"),
    `import type { ReactNode } from "react";
${concept.fonts}
import { ConceptFrame } from "@/components/navigation/ConceptFrame";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ConceptFrame concept="${concept.id}" className={\`\${display.variable} \${body.variable}\`}>
      {children}
    </ConceptFrame>
  );
}
`,
  );

  await writeFile(
    path.join(base, "page.tsx"),
    `import type { Metadata } from "next";
import { ${concept.home} } from "${concept.from}";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "${concept.title}",
  description: "${concept.description}",
  path: "/${concept.id}",
});

export default function Page() {
  return <${concept.home} />;
}
`,
  );

  await writeFile(
    path.join(base, "collections", "page.tsx"),
    `import type { Metadata } from "next";
import { CollectionsIndexPage } from "@/components/pages/CollectionsIndexPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Collections",
  description: "Sample jewellery collections for Diksha Jewellers, Vidyadhar Nagar, Jaipur. Gold, silver, diamond, bridal and more.",
  path: "/${concept.id}/collections",
});

export default function Page() {
  return <CollectionsIndexPage concept="${concept.id}" />;
}
`,
  );

  await writeFile(
    path.join(base, "collections", "[slug]", "page.tsx"),
    `import type { Metadata } from "next";
import { collections, getCollection } from "@/data/collections";
import { CollectionPage } from "@/components/pages/CollectionPage";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  return pageMeta({
    title: collection?.name ?? "Collection",
    description: collection?.intro ?? "A jewellery collection at Diksha Jewellers, Jaipur.",
    path: \`/${concept.id}/collections/\${slug}\`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CollectionPage concept="${concept.id}" slug={slug} />;
}
`,
  );

  await writeFile(
    path.join(base, "product", "[slug]", "page.tsx"),
    `import type { Metadata } from "next";
import { getProduct, products } from "@/data/products";
import { ProductPage } from "@/components/pages/ProductPage";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return pageMeta({
    title: product?.name ?? "Jewellery",
    description: product?.summary ?? "Sample jewellery at Diksha Jewellers, Jaipur.",
    path: \`/${concept.id}/product/\${slug}\`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProductPage concept="${concept.id}" slug={slug} />;
}
`,
  );

  await writeFile(
    path.join(base, "experience-360", "page.tsx"),
    `import type { Metadata } from "next";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Discover Every Angle",
  description: "Explore the details, craftsmanship and beauty of every piece at Diksha Jewellers, Jaipur.",
  path: "/${concept.id}/experience-360",
});

export default function Page() {
  return <ExperiencePage concept="${concept.id}" />;
}
`,
  );

  await writeFile(
    path.join(base, "experience-360", "[slug]", "page.tsx"),
    `import type { Metadata } from "next";
import { getProduct, products } from "@/data/products";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.filter((product) => product.sequenceId).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return pageMeta({
    title: product ? \`\${product.name} in 360\` : "360 experience",
    description: "Explore the details, craftsmanship and beauty of every piece.",
    path: \`/${concept.id}/experience-360/\${slug}\`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ExperiencePage concept="${concept.id}" slug={slug} />;
}
`,
  );

  await writeFile(
    path.join(base, "about", "page.tsx"),
    `import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "An appreciation for beauty, detail and timeless jewellery at Diksha Jewellers, Vidyadhar Nagar, Jaipur.",
  path: "/${concept.id}/about",
});

export default function Page() {
  return <AboutPage concept="${concept.id}" />;
}
`,
  );

  await writeFile(
    path.join(base, "contact", "page.tsx"),
    `import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: "Visit Diksha Jewellers at B-66, LS Nagar Road, Vidyadhar Nagar, Jaipur. Call +91 99292 75335 or request an appointment on WhatsApp.",
  path: "/${concept.id}/contact",
});

export default function Page() {
  return <ContactPage concept="${concept.id}" />;
}
`,
  );

  await writeFile(
    path.join(base, "search", "page.tsx"),
    `import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/components/pages/SearchPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Search",
  description: "Search the sample jewellery catalogue for Diksha Jewellers, Jaipur.",
  path: "/${concept.id}/search",
});

export default function Page() {
  return (
    <Suspense fallback={<p className="wrap py-16">Searching the sample catalogue…</p>}>
      <SearchPage concept="${concept.id}" />
    </Suspense>
  );
}
`,
  );
}

console.log("routes written");
