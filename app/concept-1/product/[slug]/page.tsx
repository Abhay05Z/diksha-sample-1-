import type { Metadata } from "next";
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
    description: product?.summary ?? "Sample jewellery at Jewellery Store Sample, Jaipur.",
    path: `/concept-1/product/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProductPage concept="concept-1" slug={slug} />;
}
