"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { ConceptId } from "@/data/concepts";
import type { Product } from "@/data/products";
import { conceptPath } from "@/lib/routes";
import { productEnquiry, whatsappHref } from "@/lib/whatsapp";

export function QuickView({
  product,
  concept,
  onClose,
}: {
  product: Product | null;
  concept: ConceptId;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;
  const image = product.images[0];

  return (
    <div className="dialog-back" onClick={onClose}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="quick-title" onClick={(event) => event.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} />
        <div style={{ padding: "1.5rem" }}>
          <p className="label">Sample listing</p>
          <h2 id="quick-title" className="font-display" style={{ fontSize: "2.4rem", margin: "0.4rem 0" }}>
            {product.name}
          </h2>
          <p className="muted">{product.code}</p>
          <p>{product.summary}</p>
          <p className="muted">Price, purity and weight are shared at the showroom.</p>
          <div className="flex flex-wrap gap-3" style={{ marginTop: "1rem" }}>
            <Link className="btn btn-primary" href={conceptPath(concept, `/product/${product.slug}`)}>
              View details
            </Link>
            <a className="btn btn-ghost" href={whatsappHref(productEnquiry(product.name, product.code))} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <button className="btn btn-ghost" type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
