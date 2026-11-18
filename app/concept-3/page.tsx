import type { Metadata } from "next";
import { AtelierHome } from "@/components/concepts/atelier/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "The Modern Atelier",
  description: "A minimal cream boutique presentation of Jewellery Store Sample in Vidyadhar Nagar, Jaipur.",
  path: "/concept-3",
});

export default function Page() {
  return <AtelierHome />;
}
