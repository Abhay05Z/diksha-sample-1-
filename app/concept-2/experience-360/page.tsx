import type { Metadata } from "next";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Discover Every Angle",
  description: "Explore the details, craftsmanship and beauty of every piece at Jewellery Store Sample, Jaipur.",
  path: "/concept-2/experience-360",
});

export default function Page() {
  return <ExperiencePage concept="concept-2" />;
}
