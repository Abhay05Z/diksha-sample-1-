import type { Metadata } from "next";
import { HeritageHome } from "@/components/concepts/heritage/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "The Heritage Collection",
  description: "A burgundy and antique-gold presentation of Jewellery Store Sample, Jaipur, with bridal and traditional jewellery studies.",
  path: "/concept-4",
});

export default function Page() {
  return <HeritageHome />;
}
