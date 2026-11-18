import type { Metadata } from "next";
import { ExperiencePage } from "@/components/pages/ExperiencePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Discover Every Angle",
  description: "Explore the details, craftsmanship and beauty of every piece at Diksha Jewellers, Jaipur.",
  path: "/concept-4/experience-360",
});

export default function Page() {
  return <ExperiencePage concept="concept-4" />;
}
