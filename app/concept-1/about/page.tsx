import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: "An appreciation for beauty, detail and timeless jewellery at Diksha Jewellers, Vidyadhar Nagar, Jaipur.",
  path: "/concept-1/about",
});

export default function Page() {
  return <AboutPage concept="concept-1" />;
}
