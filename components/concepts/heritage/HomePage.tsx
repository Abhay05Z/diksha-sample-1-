import Link from "next/link";
import { addressLines, business } from "@/data/business";
import { Photo } from "@/components/shared/Photo";
import { conceptPath } from "@/lib/routes";

const concept = "concept-4" as const;

const film = [
  ["/assets/worn/wear-tika.webp", "Tika"],
  ["/assets/worn/wear-sari.webp", "Bridal"],
  ["/assets/worn/wear-necklace.webp", "Necklace"],
  ["/assets/worn/wear-bridal-gold.webp", "Gold"],
  ["/assets/worn/wear-close.webp", "Earrings"],
  ["/assets/products/bangles-dark.webp", "Bangles"],
] as const;

export function HeritageHome() {
  return (
    <div className="bg-[#f6f0e5] text-[#50382b]">
      <header className="flex items-end justify-between bg-[#451c25] px-5 py-4 text-[#f6f0e5]">
        <Link href={conceptPath(concept)}>
          <span className="block font-display text-3xl italic">Diksha</span>
          <span className="text-[0.62rem] tracking-[0.32em] text-[#e4c98a]">JEWELLERS</span>
        </Link>
        <p className="m-0 text-xs tracking-[0.14em]">{business.address.area}</p>
      </header>
      <section className="px-5 py-10 md:px-10">
        <p className="text-xs tracking-[0.24em] text-[#b18b50]">JAIPUR</p>
        <h1 className="hero-title max-w-4xl">
          Tradition, <span className="italic">Crafted to Last Forever.</span>
        </h1>
      </section>
      <div className="flex gap-4 overflow-x-auto px-5 pb-8" data-lenis-prevent>
        {film.map(([src, label]) => (
          <Link key={label} href={conceptPath(concept, "/collections/bridal")} className="w-40 shrink-0 text-center md:w-52">
            <Photo src={src} alt={`Sample ${label.toLowerCase()} jewellery worn in a portrait.`} className="aspect-square rounded-full" sizes="220px" />
            <span className="mt-2 block text-[0.68rem] tracking-[0.16em]">{label.toUpperCase()}</span>
          </Link>
        ))}
      </div>
      <section className="grid md:grid-cols-2">
        <Photo src="/assets/products/bridal-red.webp" alt="Sample bridal necklace and earrings." priority className="min-h-[70vh]" />
        <div className="flex flex-col justify-center bg-[#451c25] px-8 py-12 text-[#f6f0e5]">
          <h2 className="font-display text-4xl text-[#f6f0e5]">Seen on the person, then in the showroom.</h2>
          <p className="text-[#f0e2cf]">Gold, silver and diamond jewellery in Vidyadhar Nagar. Ask for a quotation. Nothing here is an online purchase.</p>
          {addressLines().map((line) => (
            <p key={line} className="mb-0">
              {line}
            </p>
          ))}
          <a className="mt-4 text-[#e4c98a]" href={business.mapsDirections} target="_blank" rel="noopener noreferrer">
            Open Google location
          </a>
        </div>
      </section>
    </div>
  );
}
