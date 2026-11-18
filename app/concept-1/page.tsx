import type { Metadata } from "next";
import { MaisonHome } from "@/components/concepts/maison/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "The Royal Maison",
  description: "A timeless ivory and champagne presentation of Jewellery Store Sample, a jewellery showroom in Vidyadhar Nagar, Jaipur.",
  path: "/concept-1",
});

export default function Page() {
  return <MaisonHome />;
}
