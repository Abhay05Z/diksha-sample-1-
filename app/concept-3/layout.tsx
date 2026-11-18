import type { ReactNode } from "react";
import { Figtree, Newsreader } from "next/font/google";
import { ConceptFrame } from "@/components/navigation/ConceptFrame";

const display = Newsreader({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ConceptFrame concept="concept-3" className={`${display.variable} ${body.variable}`}>
      {children}
    </ConceptFrame>
  );
}
