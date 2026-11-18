import Link from "next/link";
import { Photo } from "@/components/shared/Photo";
import { conceptPath } from "@/lib/routes";

const concept = "concept-3" as const;

const list = [
  ["Necklaces", "/collections/necklace-sets"],
  ["Earrings", "/collections/earrings"],
  ["Rings", "/collections/rings"],
  ["Bangles", "/collections/bangles"],
  ["Bridal", "/collections/bridal"],
  ["Everyday", "/collections/everyday"],
] as const;

export function AtelierHome() {
  return (
    <div className="bg-[#f7f4ee] text-[#37332f]">
      <header className="flex items-center justify-between px-6 py-5">
        <Link href={conceptPath(concept)} className="text-sm tracking-[0.28em]">
          SAMPLE
        </Link>
        <Link href={conceptPath(concept, "/contact")} className="text-xs tracking-[0.16em]">
          VISIT JAIPUR
        </Link>
      </header>
      <section className="grid min-h-[86vh] md:grid-cols-12">
        <div className="flex flex-col justify-center px-6 py-10 md:col-span-5 md:px-12">
          <p className="text-xs tracking-[0.22em] text-[#a99b88]">THE MODERN ATELIER</p>
          <h1 className="hero-title mt-4">Every Detail. A Little Extraordinary.</h1>
          <form className="mt-8 border-b border-[#37332f]" action={conceptPath(concept, "/search")}>
            <input className="w-full bg-transparent py-3 outline-none" name="q" aria-label="Search" placeholder="Search a category" />
          </form>
          <ul className="mt-8 list-none p-0">
            {list.map(([label, href], index) => (
              <li key={label} className="border-t border-[#e4dacb]">
                <Link className="flex justify-between py-3" href={conceptPath(concept, href)}>
                  <span className="font-display text-2xl">{label}</span>
                  <span className="text-xs tracking-[0.16em]">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Photo
          src="/assets/worn/wear-traditional.webp"
          alt="Sample portrait of a woman in traditional gold jewellery."
          priority
          className="min-h-[70vh] md:col-span-7"
        />
      </section>
      <section className="grid gap-4 px-6 pb-16 md:grid-cols-3">
        <Photo src="/assets/worn/wear-earrings.webp" alt="Sample portrait wearing gold earrings." className="aspect-[3/4]" />
        <Photo src="/assets/worn/wear-bangles.webp" alt="Sample close view of gold bangles being worn." className="aspect-[3/4] md:mt-16" />
        <Photo src="/assets/editorial/bridal-portrait.webp" alt="Sample bridal jewellery portrait." className="aspect-[3/4]" />
      </section>
    </div>
  );
}
