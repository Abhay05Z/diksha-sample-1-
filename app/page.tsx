import { Cormorant_Garamond, Jost } from "next/font/google";
import Link from "next/link";
import { business } from "@/data/business";
import { concepts, conceptIds } from "@/data/concepts";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export default function HomePage() {
  return (
    <div id="content" className={`index-page ${display.variable} ${body.variable}`} style={{ fontFamily: "var(--font-jost), sans-serif" }}>
      <main className="wrap flex min-h-screen flex-col justify-center py-16">
        <p className="m-0 text-xs tracking-[0.28em] text-[#c5a46d]">DIKSHA JEWELLERS · JAIPUR</p>
        <h1 className="m-0 mt-4 max-w-3xl text-5xl leading-none md:text-7xl">Which concept would you like to see?</h1>
        <p className="mt-5 max-w-xl text-[#d9d0c6]">Pick one. You can switch to another at any time from the bar on the page.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {conceptIds.map((id, index) => {
            const concept = concepts[id];
            return (
              <Link key={id} href={`/${id}`} className="group overflow-hidden border border-white/15">
                <div className="relative h-44">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={concept.preview} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <p className="m-0 text-xs tracking-[0.22em] text-[#c5a46d]">CONCEPT {index + 1}</p>
                  <h2 className="mb-0 mt-2 text-3xl">{concept.name}</h2>
                  <p className="mt-2 text-sm text-[#d9d0c6]">{concept.summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="mt-10 text-sm text-[#b7aea4]">
          {business.address.line1}, {business.address.area}, {business.address.city}. {business.phoneDisplay}
        </p>
      </main>
    </div>
  );
}
