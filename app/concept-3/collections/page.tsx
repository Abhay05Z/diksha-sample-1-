import type { Metadata } from "next";
import { CollectionsIndexPage } from "@/components/pages/CollectionsIndexPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Collections",
  description: "Sample jewellery collections for Diksha Jewellers, Vidyadhar Nagar, Jaipur. Gold, silver, diamond, bridal and more.",
  path: "/concept-3/collections",
});

export default function Page() {
  return <CollectionsIndexPage concept="concept-3" />;
}
