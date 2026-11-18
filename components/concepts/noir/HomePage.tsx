import Link from "next/link";
import { Photo } from "@/components/shared/Photo";
import { conceptPath } from "@/lib/routes";

const concept = "concept-2" as const;

const tiles = [
  ["/assets/worn/wear-necklace.webp", "Necklaces", "/collections/necklace-sets"],
  ["/assets/worn/wear-earrings.webp", "Earrings", "/collections/earrings"],
  ["/assets/products/bangles-dark.webp", "Bangles", "/collections/bangles"],
  ["/assets/products/ring-engagement.webp", "Rings", "/collections/rings"],
] as const;

export function NoirHome() {
  return (
    <div className="bg-[#0e0e0e] text-[#f4f0e8]">
      <header className="flex items-center justify-between px-5 py-4 md:px-8">
        <Link href={conceptPath(concept)} className="font-display text-2xl tracking-[0.22em]">
          DIKSHA
        </Link>
        <nav className="hidden gap-6 text-[0.68rem] tracking-[0.2em] md:flex">
          <Link href={conceptPath(concept, "/collections/diamond")}>Diamond</Link>
          <Link href={conceptPath(concept, "/collections/gold")}>Gold</Link>
          <Link href={conceptPath(concept, "/collections/bridal")}>Bridal</Link>
          <Link href={conceptPath(concept, "/contact")}>Visit</Link>
        </nav>
      </header>
      <section className="relative min-h-[88vh]">
        <Photo
          src="/assets/worn/wear-face.webp"
          alt="Sample close portrait of a woman wearing earrings."
          priority
          className="absolute inset-0 h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/25" />
        <div className="relative z-10 flex min-h-[88vh] items-end px-5 pb-16 md:px-10">
          <div>
            <p className="text-[0.72rem] tracking-[0.28em] text-[#d7c39a]">NOIR LUXE</p>
            <h1 className="hero-title max-w-4xl text-white">An Expression Beyond Ordinary.</h1>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-4">
        {tiles.map(([src, label, href]) => (
          <Link key={label} href={conceptPath(concept, href)} className="group">
            <Photo src={src} alt={`Sample ${label.toLowerCase()} jewellery.`} className="aspect-[3/4]" />
            <p className="px-4 py-3 text-xs tracking-[0.22em]">{label.toUpperCase()}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
