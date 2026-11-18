import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/components/pages/SearchPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Search",
  description: "Search the sample jewellery catalogue for Jewellery Store Sample, Jaipur.",
  path: "/concept-3/search",
});

export default function Page() {
  return (
    <Suspense fallback={<p className="wrap py-16">Searching the sample catalogue…</p>}>
      <SearchPage concept="concept-3" />
    </Suspense>
  );
}
