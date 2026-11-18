import type { Metadata } from "next";
import { CollectionsIndexPage } from "@/components/pages/CollectionsIndexPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Collections",
  description: "Sample jewellery collections for Jewellery Store Sample, Vidyadhar Nagar, Jaipur. Gold, silver, diamond, bridal and more.",
  path: "/concept-1/collections",
});

export default function Page() {
  return <CollectionsIndexPage concept="concept-1" />;
}
