import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/collections";
import { concepts, type ConceptId } from "@/data/concepts";
import { productsIn } from "@/data/products";
import { conceptPath } from "@/lib/routes";

export function CollectionsIndexPage({ concept }: { concept: ConceptId }) {
  const theme = concepts[concept];
  return (
    <div className="wrap py-14">
      <p className="label">{theme.name}</p>
      <h1 className="font-display text-5xl md:text-6xl">Collections</h1>
      <p className="max-w-2xl text-lg text-[var(--muted)]">
        Sixteen ways to look. Some pages already have sample photographs. Polki and mangalsutra stay empty until a true picture is available.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {collections.map((collection) => {
          const count = productsIn(collection.slug).length;
          return (
            <Link key={collection.slug} href={conceptPath(concept, `/collections/${collection.slug}`)} className="grid grid-cols-[140px_1fr] gap-4 border-b border-[var(--line)] pb-5">
              <div className="relative aspect-square bg-[var(--bg-soft)]">
                {collection.image ? (
                  <Image src={collection.image} alt={collection.imageAlt} fill sizes="140px" className="object-cover" />
                ) : (
                  <span className="label absolute inset-0 grid place-items-center">Soon</span>
                )}
              </div>
              <div>
                <h2 className="font-display text-3xl">{collection.name}</h2>
                <p className="text-[var(--muted)]">{count === 0 ? "No sample photograph yet" : `${count} sample ${count === 1 ? "study" : "studies"}`}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
