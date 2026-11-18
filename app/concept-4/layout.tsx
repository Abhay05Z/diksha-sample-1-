import type { ReactNode } from "react";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { ConceptFrame } from "@/components/navigation/ConceptFrame";

const display = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display-face", display: "swap" });
const body = Source_Sans_3({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body-face", display: "swap" });

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ConceptFrame concept="concept-4" className={`${display.variable} ${body.variable}`}>
      {children}
    </ConceptFrame>
  );
}
