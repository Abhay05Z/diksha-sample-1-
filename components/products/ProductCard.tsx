import Image from "next/image";
import Link from "next/link";
import { getCollection } from "@/data/collections";
import type { ConceptId } from "@/data/concepts";
import type { Product } from "@/data/products";
import { conceptPath } from "@/lib/routes";
import { productEnquiry, whatsappHref } from "@/lib/whatsapp";

export function ProductCard({
  product,
  concept,
  onQuick,
}: {
  product: Product;
  concept: ConceptId;
  onQuick: (product: Product) => void;
}) {
  const primary = product.collections[0];
  const category = primary ? getCollection(primary)?.name : product.material;
  const href = conceptPath(concept, `/product/${product.slug}`);
  const image = product.images[0];

  return (
    <article className="product-card">
      <Link href={href} className="product-card-media relative">
        <span className="badge badge-sample">Sample</span>
        {product.sequenceId ? <span className="badge badge-360">360°</span> : null}
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
      </Link>
      <div className="product-card-body">
        <p className="label">{category}</p>
        <h3 className="font-display">
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className="muted" style={{ margin: 0, fontSize: "0.82rem" }}>
          {product.code}
        </p>
        <div className="card-actions">
          <Link href={href}>View details</Link>
          <button type="button" onClick={() => onQuick(product)}>
            Quick view
          </button>
          <a href={whatsappHref(productEnquiry(product.name, product.code))} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
