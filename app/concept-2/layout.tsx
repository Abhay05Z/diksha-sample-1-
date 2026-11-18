import type { ReactNode } from "react";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { ConceptFrame } from "@/components/navigation/ConceptFrame";

const display = Bodoni_Moda({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ConceptFrame concept="concept-2" className={`${display.variable} ${body.variable}`}>
      {children}
    </ConceptFrame>
  );
}
