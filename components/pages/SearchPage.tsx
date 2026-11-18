"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { ConceptId } from "@/data/concepts";
import { searchProducts, type Product } from "@/data/products";
import { conceptPath } from "@/lib/routes";
import { ProductCard } from "@/components/products/ProductCard";
import { QuickView } from "@/components/products/QuickView";

export function SearchPage({ concept }: { concept: ConceptId }) {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const [quick, setQuick] = useState<Product | null>(null);
  const results = useMemo(() => searchProducts(query), [query]);

  return (
    <div className="wrap py-14">
      <p className="label">Search</p>
      <h1 className="font-display text-5xl">Find a sample piece</h1>
      <form action={conceptPath(concept, "/search")} className="mt-6 max-w-xl">
        <label className="field">
          <span>Name, code or category</span>
          <input name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ring, bridal, SAMPLE-RG-01" />
        </label>
      </form>
      <p className="text-[var(--muted)]">{results.length} sample {results.length === 1 ? "study" : "studies"}</p>
      <div className="product-grid mt-6">
        {results.map((product) => (
          <ProductCard key={product.slug} product={product} concept={concept} onQuick={setQuick} />
        ))}
      </div>
      {!results.length ? (
        <p>
          Nothing matched. <Link href={conceptPath(concept, "/collections")}>Browse collections</Link> or ask on WhatsApp.
        </p>
      ) : null}
      <QuickView product={quick} concept={concept} onClose={() => setQuick(null)} />
    </div>
  );
}
