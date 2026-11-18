import type { ReactNode } from "react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { ConceptFrame } from "@/components/navigation/ConceptFrame";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Jost({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ConceptFrame concept="concept-1" className={`${display.variable} ${body.variable}`}>
      {children}
    </ConceptFrame>
  );
}
