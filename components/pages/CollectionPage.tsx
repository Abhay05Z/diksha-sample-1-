import Image from "next/image";
import { notFound } from "next/navigation";
import { getCollection } from "@/data/collections";
import { concepts, type ConceptId } from "@/data/concepts";
import { CollectionBrowser } from "@/components/collections/CollectionBrowser";

export function CollectionPage({ concept, slug }: { concept: ConceptId; slug: string }) {
  const collection = getCollection(slug);
  if (!collection) notFound();
  const theme = concepts[concept];

  return (
    <>
      <section className={`banner relative ${collection.image ? "scrim" : "plain"}`}>
        {collection.image ? <Image src={collection.image} alt={collection.imageAlt} fill priority sizes="100vw" className="object-cover" /> : null}
        <div className="wrap banner-copy">
          <p className="label">{theme.name}</p>
          <h1 className="font-display text-5xl md:text-7xl" style={{ margin: "0.3rem 0" }}>
            {collection.name}
          </h1>
        </div>
      </section>
      <div className="wrap" style={{ paddingTop: "2.5rem" }}>
        <p className="max-w-2xl text-lg leading-relaxed">{collection.intro}</p>
        <p className="muted">Sample photography. Prices are not listed, because the showroom confirms them.</p>
      </div>
      <CollectionBrowser concept={concept} slug={slug} />
    </>
  );
}
