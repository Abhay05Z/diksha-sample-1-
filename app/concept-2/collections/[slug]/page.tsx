import type { Metadata } from "next";
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
    path: `/concept-2/collections/${slug}`,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CollectionPage concept="concept-2" slug={slug} />;
}
