import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/components/pages/SearchPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Search",
  description: "Search the sample jewellery catalogue for Diksha Jewellers, Jaipur.",
  path: "/concept-2/search",
});

export default function Page() {
  return (
    <Suspense fallback={<p className="wrap py-16">Searching the sample catalogue…</p>}>
      <SearchPage concept="concept-2" />
    </Suspense>
  );
}
