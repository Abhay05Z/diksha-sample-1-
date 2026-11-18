import type { Metadata } from "next";
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
    title: product ? `${product.name} in 360` : "360 experience",
    description: "Explore the details, craftsmanship and beauty of every piece.",
    path: `/concept-2/experience-360/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ExperiencePage concept="concept-2" slug={slug} />;
}
