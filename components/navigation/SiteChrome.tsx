"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { concepts, type ConceptId } from "@/data/concepts";
import { business } from "@/data/business";
import { generalEnquiry, whatsappHref } from "@/lib/whatsapp";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { ConceptNav } from "@/components/navigation/ConceptNav";
import { ConceptFooter } from "@/components/navigation/ConceptFooter";
import { ConceptSwitch } from "@/components/navigation/ConceptSwitch";
import { WelcomePopup } from "@/components/enquiry/WelcomePopup";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      {children}
    </svg>
  );
}

export function SiteChrome({
  concept,
  className,
  children,
}: {
  concept: ConceptId;
  className: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === `/${concept}`;
  const theme = concepts[concept];
  const [welcome, setWelcome] = useState(false);
  const [quote, setQuote] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 900px)");
    const apply = () => setNarrow(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("diksha-welcome")) return;
    const timer = window.setTimeout(() => setWelcome(true), 700);
    return () => window.clearTimeout(timer);
  }, []);

  function openQuote() {
    setQuote(true);
    setWelcome(true);
  }

  return (
    <div data-concept={theme.key} className={`concept-shell ${className} ${isHome ? "is-home" : ""}`}>
      <SmoothScroll>
        <ConceptSwitch concept={concept} />
        {!isHome || narrow ? <ConceptNav concept={concept} /> : null}
        <main id="content">{children}</main>
        {!isHome || narrow ? <ConceptFooter concept={concept} /> : null}
        <div className={`action-dock dock-${theme.key}`}>
          <a href={business.mapsDirections} target="_blank" rel="noopener noreferrer" aria-label="Google location">
            <Icon>
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
            </Icon>
            <span>Location</span>
          </a>
          <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Icon>
              <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2ZM17.2 6.8a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
            </Icon>
            <span>Instagram</span>
          </a>
          <a className="dock-wa" href={whatsappHref(generalEnquiry)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Icon>
              <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.7.7-3.1-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4c.5.2 1 .4 1.5.5a3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
            </Icon>
            <span>WhatsApp</span>
          </a>
          <a href={`tel:${business.phoneTel}`} aria-label="Call the showroom">
            <Icon>
              <path d="M6.6 3.5h3l1.2 4-2 1.2a12 12 0 0 0 6.3 6.3l1.2-2 4 1.2v3A2 2 0 0 1 18.2 19 16 16 0 0 1 5 5.8a2 2 0 0 1 1.6-2.3Z" />
            </Icon>
            <span>Call</span>
          </a>
          <button type="button" onClick={openQuote} aria-label="Get a quotation">
            <Icon>
              <path d="M5 4h14v12H8l-3 3V4Zm3 4h8v2H8V8Zm0 4h6v2H8v-2Z" />
            </Icon>
            <span>Quotation</span>
          </button>
        </div>
        <WelcomePopup
          open={welcome}
          quotation={quote}
          onClose={() => {
            setWelcome(false);
            setQuote(false);
            if (!sessionStorage.getItem("diksha-welcome")) sessionStorage.setItem("diksha-welcome", "closed");
          }}
        />
      </SmoothScroll>
    </div>
  );
}
