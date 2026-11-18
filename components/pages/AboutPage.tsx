import { concepts, type ConceptId } from "@/data/concepts";
import { Photo } from "@/components/shared/Photo";
import { conceptPath } from "@/lib/routes";
import Link from "next/link";

export function AboutPage({ concept }: { concept: ConceptId }) {
  const theme = concepts[concept];
  const image = theme.key === "noir" ? "/assets/products/silver-black.webp" : theme.key === "heritage" ? "/assets/products/kundan-set.webp" : theme.key === "atelier" ? "/assets/products/pearl-pendants.webp" : "/assets/editorial/gold-adornment.webp";

  return (
    <article className="wrap grid items-start gap-10 py-14 md:grid-cols-2">
      <div>
        <p className="label">{theme.name}</p>
        <h1 className="font-display text-5xl md:text-6xl">An Appreciation for Beauty, Detail and Timeless Jewellery.</h1>
        <p className="text-lg leading-relaxed">
          Diksha Jewellers is a jewellery showroom in Vidyadhar Nagar, Jaipur. People come to look at gold, silver and diamond jewellery, and to take the time a piece deserves.
        </p>
        <p className="leading-relaxed">
          The visit is personal. You can compare designs, ask what is available, and decide in the room rather than through a checkout. This website introduces that visit. It does not take payment, and it does not invent a history for the house.
        </p>
        <p className="leading-relaxed text-[var(--muted)]">
          The photographs are licensed samples, so the pages can be designed before the showroom’s own catalogue is photographed. Names, codes and categories can be edited. Nothing here should be read as current stock.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href={conceptPath(concept, "/contact")}>
            Visit or write
          </Link>
          <Link className="btn btn-ghost" href={conceptPath(concept, "/collections")}>
            View collections
          </Link>
        </div>
      </div>
      <Photo src={image} alt="Sample jewellery photograph used on the about page." className="aspect-[4/5]" />
    </article>
  );
}
