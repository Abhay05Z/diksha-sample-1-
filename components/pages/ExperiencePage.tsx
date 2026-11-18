import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts, type ConceptId } from "@/data/concepts";
import { getProduct, products, relatedProducts } from "@/data/products";
import { demoModel, turntables } from "@/data/viewers";
import { Jewellery360Viewer } from "@/components/360-viewer/Jewellery360Viewer";
import { ModelCanvas } from "@/components/360-viewer/ModelCanvas";
import { conceptPath } from "@/lib/routes";
import { productEnquiry, whatsappHref } from "@/lib/whatsapp";

export function ExperiencePage({ concept, slug }: { concept: ConceptId; slug?: string }) {
  const withView = products.filter((product) => product.sequenceId);
  const product = slug ? getProduct(slug) : withView[0];
  if (!product || !product.sequenceId) notFound();
  const theme = concepts[concept];
  const related = relatedProducts(product.slug);

  return (
    <div className="wrap py-12 md:py-16">
      <p className="label">{theme.name}</p>
      <h1 className="hero-title text-[clamp(2.8rem,6vw,5.4rem)]">Discover Every Angle.</h1>
      <p className="max-w-xl text-lg">Explore the details, craftsmanship and beauty of every piece.</p>

      <div className="mt-8 flex flex-wrap gap-4">
        {withView.map((item) => (
          <Link key={item.slug} href={conceptPath(concept, `/experience-360/${item.slug}`)} className={item.slug === product.slug ? "gold" : ""}>
            {item.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <Jewellery360Viewer sequenceId={product.sequenceId} alt={product.name} autoStart />
          <p className="viewer-note">{turntables[product.sequenceId].label}</p>
        </div>
        <aside>
          <p className="label">Sample</p>
          <h2 className="font-display text-4xl">{product.name}</h2>
          <p className="text-[var(--muted)]">{product.code}</p>
          <p>{product.summary}</p>
          <p className="text-[var(--muted)]">{product.material}. Specifications are confirmed at the showroom.</p>
          <a className="btn btn-primary mt-4" href={whatsappHref(productEnquiry(product.name, product.code))} target="_blank" rel="noopener noreferrer">
            Enquire on WhatsApp
          </a>
        </aside>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="label">Studio study</p>
          <h2 className="font-display text-4xl">A ring, modelled in light.</h2>
          <p className="viewer-note">Drawn in the browser as a lighting study. It is not a showroom piece and it is not a rotated photograph.</p>
          <ModelCanvas mode="procedural" />
        </div>
        <div>
          <p className="label">GLB file</p>
          <h2 className="font-display text-4xl">Drag the demonstration model.</h2>
          <p className="viewer-note">
            {demoModel.label} Source: {demoModel.sourceName}, {demoModel.license}.
          </p>
          <ModelCanvas mode="glb" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-3xl">Related studies</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {related.map((item) => (
            <Link key={item.slug} href={conceptPath(concept, `/product/${item.slug}`)}>
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
