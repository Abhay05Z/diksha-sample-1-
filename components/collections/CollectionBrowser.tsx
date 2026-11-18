"use client";

import { useMemo, useState } from "react";
import { getCollection } from "@/data/collections";
import type { ConceptId } from "@/data/concepts";
import { productsIn, type Product } from "@/data/products";
import { conceptPath } from "@/lib/routes";
import { collectionEnquiry, whatsappHref } from "@/lib/whatsapp";
import { ProductCard } from "@/components/products/ProductCard";
import { QuickView } from "@/components/products/QuickView";
import Link from "next/link";

export function CollectionBrowser({ concept, slug }: { concept: ConceptId; slug: string }) {
  const collection = getCollection(slug);
  const source = useMemo(() => productsIn(slug), [slug]);
  const facets = useMemo(() => {
    const counts = new Map<string, number>();
    source.forEach((product) => {
      product.collections.forEach((item) => {
        if (item !== slug) counts.set(item, (counts.get(item) ?? 0) + 1);
      });
    });
    return [...counts.entries()].map(([item]) => item);
  }, [source, slug]);

  const [facet, setFacet] = useState("all");
  const [sort, setSort] = useState("featured");
  const [quick, setQuick] = useState<Product | null>(null);

  const items = useMemo(() => {
    const filtered = source.filter((product) => facet === "all" || product.collections.includes(facet));
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "code") return a.code.localeCompare(b.code);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name);
    });
  }, [source, facet, sort]);

  if (!collection) return null;

  return (
    <div className="wrap" style={{ padding: "2rem 0 4rem" }}>
      <div className="filters" style={{ marginBottom: "1.5rem" }}>
        <button className={`chip ${facet === "all" ? "is-on" : ""}`} type="button" onClick={() => setFacet("all")}>
          All sample pieces
        </button>
        {facets.map((item) => (
          <button key={item} className={`chip ${facet === item ? "is-on" : ""}`} type="button" onClick={() => setFacet(item)}>
            {getCollection(item)?.name ?? item}
          </button>
        ))}
        <select aria-label="Sort sample pieces" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="featured">Featured</option>
          <option value="name">Name</option>
          <option value="code">Sample code</option>
        </select>
        <Link href={conceptPath(concept, "/search")}>Search</Link>
      </div>
      {items.length ? (
        <div className="product-grid">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} concept={concept} onQuick={setQuick} />
          ))}
        </div>
      ) : (
        <div style={{ padding: "3rem 0", maxWidth: "46ch" }}>
          <h2 className="font-display" style={{ fontSize: "2.4rem", marginTop: 0 }}>
            No sample photograph is filed here yet.
          </h2>
          <p className="muted">Ask the showroom what is available to see. A photograph will be added only when it truly belongs to this category.</p>
        </div>
      )}
      <div style={{ marginTop: "2rem" }}>
        <a className="btn btn-primary" href={whatsappHref(collectionEnquiry(collection.name))} target="_blank" rel="noopener noreferrer">
          Enquire about {collection.name} on WhatsApp
        </a>
      </div>
      <QuickView product={quick} concept={concept} onClose={() => setQuick(null)} />
    </div>
  );
}
