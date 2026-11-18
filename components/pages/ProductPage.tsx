import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollection } from "@/data/collections";
import { concepts, type ConceptId } from "@/data/concepts";
import { getProduct, relatedProducts } from "@/data/products";
import { turntables } from "@/data/viewers";
import { Jewellery360Viewer } from "@/components/360-viewer/Jewellery360Viewer";
import { conceptPath } from "@/lib/routes";
import { productEnquiry, whatsappHref } from "@/lib/whatsapp";

export function ProductPage({ concept, slug }: { concept: ConceptId; slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();
  const theme = concepts[concept];
  const related = relatedProducts(product.slug);
  const wa = whatsappHref(productEnquiry(product.name, product.code));
  const image = product.images[0];
  const noir = theme.key === "noir";
  const heritage = theme.key === "heritage";

  return (
    <article className={`has-sticky ${noir ? "bg-[#101010]" : ""}`}>
      <div className={`wrap grid items-start gap-8 py-10 md:py-16 ${heritage ? "md:grid-cols-[1.05fr_0.95fr]" : "md:grid-cols-2"}`}>
        <div className={heritage ? "border border-[rgba(177,139,80,0.6)] p-3" : ""} style={theme.key === "maison" ? { position: "sticky", top: "7rem" } : undefined}>
          <div className="relative aspect-[4/5] bg-[var(--bg-soft)]">
            <Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" />
            <span className="badge badge-sample">Sample</span>
          </div>
        </div>
        <div className={theme.key === "atelier" ? "md:pt-16" : ""}>
          <p className="label">{theme.name}</p>
          <h1 className="font-display text-5xl md:text-6xl">{product.name}</h1>
          <p className="text-[var(--muted)]">Sample code {product.code}</p>
          <p className="text-lg leading-relaxed">{product.description}</p>
          <dl className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
            <dt className="text-[var(--muted)]">Collection</dt>
            <dd className="m-0">
              {product.collections.map((item, index) => (
                <span key={item}>
                  {index ? ", " : ""}
                  <Link href={conceptPath(concept, `/collections/${item}`)}>{getCollection(item)?.name ?? item}</Link>
                </span>
              ))}
            </dd>
            <dt className="text-[var(--muted)]">Material</dt>
            <dd className="m-0">{product.material}</dd>
            {product.purity ? (
              <>
                <dt>Purity</dt>
                <dd>{product.purity}</dd>
              </>
            ) : null}
            {product.weight ? (
              <>
                <dt>Weight</dt>
                <dd>{product.weight}</dd>
              </>
            ) : null}
            {product.stones ? (
              <>
                <dt>Stones</dt>
                <dd>{product.stones}</dd>
              </>
            ) : null}
            {product.price ? (
              <>
                <dt>Price</dt>
                <dd>{product.price}</dd>
              </>
            ) : null}
          </dl>
          <p className="text-[var(--muted)]">Purity, weight, stone details and price are shown only when the showroom has confirmed them. None are confirmed for this sample.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
            <a className="btn btn-ghost" href="tel:+919929275335">
              Call the showroom
            </a>
          </div>
        </div>
      </div>

      {product.sequenceId ? (
        <section className="wrap pb-16">
          <p className="label">360° study</p>
          <h2 className="font-display text-4xl">Discover Every Angle.</h2>
          <Jewellery360Viewer sequenceId={product.sequenceId} alt={product.name} />
          <p className="viewer-note">{turntables[product.sequenceId].label}</p>
        </section>
      ) : (
        <section className="wrap pb-10">
          <p className="muted">A 360° photograph has not been added for this sample. The experience page still has a working viewer.</p>
          <Link href={conceptPath(concept, "/experience-360")}>Open the 360° experience</Link>
        </section>
      )}

      {related.length ? (
        <section className="wrap pb-16">
          <h2 className="font-display text-4xl">Related studies</h2>
          <div className="product-grid mt-6">
            {related.map((item) => (
              <Link key={item.slug} href={conceptPath(concept, `/product/${item.slug}`)}>
                <div className="relative aspect-[4/5] bg-[var(--bg-soft)]">
                  <Image src={item.images[0].src} alt={item.images[0].alt} fill sizes="33vw" className="object-cover" />
                </div>
                <h3 className="font-display text-2xl">{item.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mobile-enquiry">
        <a className="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a className="btn btn-ghost" href="tel:+919929275335">
          Call
        </a>
      </div>
    </article>
  );
}
