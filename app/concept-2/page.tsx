import type { Metadata } from "next";
import { NoirHome } from "@/components/concepts/noir/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Noir Luxe",
  description: "A cinematic black and warm-ivory presentation of Diksha Jewellers, Jaipur, with gold, silver and diamond jewellery studies.",
  path: "/concept-2",
});

export default function Page() {
  return <NoirHome />;
}
