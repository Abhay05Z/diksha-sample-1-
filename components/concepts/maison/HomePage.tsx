import Link from "next/link";
import { Great_Vibes } from "next/font/google";
import { business } from "@/data/business";
import { Photo } from "@/components/shared/Photo";
import { conceptPath } from "@/lib/routes";

const script = Great_Vibes({ weight: "400", subsets: ["latin"] });
const concept = "concept-1" as const;

const circles = [
  ["/assets/worn/wear-bridal-gold.webp", "New", "/collections"],
  ["/assets/worn/wear-necklace.webp", "Necklace", "/collections/necklace-sets"],
  ["/assets/editorial/bangles-hands.webp", "Bangles", "/collections/bangles"],
  ["/assets/worn/wear-earrings.webp", "Earrings", "/collections/earrings"],
  ["/assets/products/ring-solitaire.webp", "Rings", "/collections/rings"],
  ["/assets/products/kundan-set.webp", "Bridal", "/collections/bridal"],
  ["/assets/worn/wear-tika.webp", "Tika", "/collections/kundan"],
] as const;

export function MaisonHome() {
  return (
    <div className="bg-white text-[#3a322b]">
      <div className="hub-bar">Showroom open daily · {business.hours.label} · Vidyadhar Nagar, Jaipur</div>
      <header className="hub-top">
        <Link href={conceptPath(concept)} className="hub-logo">
          <b>DIKSHA</b>
          <span>JEWELLERS</span>
        </Link>
        <form className="hub-search" action={conceptPath(concept, "/search")}>
          <input name="q" aria-label="Search" placeholder="Search" />
          <button type="submit" aria-label="Search">
            ⌕
          </button>
        </form>
        <nav className="hub-nav" aria-label="Maison">
          <Link href={conceptPath(concept)}>Home</Link>
          <Link href={conceptPath(concept, "/collections")}>Collections</Link>
          <Link href={conceptPath(concept, "/collections/necklace-sets")}>Necklaces</Link>
          <Link href={conceptPath(concept, "/collections/earrings")}>Earrings</Link>
          <Link href={conceptPath(concept, "/collections/bangles")}>Bangles</Link>
          <Link href={conceptPath(concept, "/collections/bridal")}>Bridal</Link>
          <Link href={conceptPath(concept, "/contact")}>Visit</Link>
        </nav>
      </header>
      <div className="circle-row">
        {circles.map(([src, label, href]) => (
          <Link key={label} href={conceptPath(concept, href)}>
            <Photo src={src} alt={`${label} jewellery, sample photograph`} className="aspect-square rounded-full" sizes="140px" />
            <span>{label.toUpperCase()}</span>
          </Link>
        ))}
      </div>
      <section className="trio">
        <Photo src="/assets/worn/wear-bride.webp" alt="Sample portrait of a bride in gold jewellery." priority className="min-h-[68vh]" />
        <div className="script-panel">
          <div>
            <p className={`${script.className} text-7xl leading-none md:text-8xl`}>Luxury</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#6d6258]">
              Jewellery That Becomes Your Legacy. Discover timeless expressions of elegance at Diksha Jewellers.
            </p>
          </div>
        </div>
        <Photo src="/assets/worn/wear-sari.webp" alt="Sample portrait of a woman wearing a maang tikka and sari." className="min-h-[68vh]" />
      </section>
      <section className="mx-auto grid w-min max-w-full gap-8 px-6 py-14 md:w-[1100px] md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-4xl">Book a look.</h2>
          <p className="text-[#6d6258]">Tell us the category. The showroom replies with what can be seen in Jaipur. This is not an online checkout.</p>
          <p className="mt-4">{business.address.line1}, {business.address.area}</p>
          <a className="mt-4 inline-block border-b border-[#c4b08a]" href={business.mapsDirections} target="_blank" rel="noopener noreferrer">
            Google location
          </a>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Photo src="/assets/worn/wear-traditional.webp" alt="Sample portrait in traditional gold jewellery." className="aspect-[3/4]" />
          <Photo src="/assets/worn/wear-close.webp" alt="Sample close portrait in Indian jewellery." className="aspect-[3/4]" />
        </div>
      </section>
    </div>
  );
}
