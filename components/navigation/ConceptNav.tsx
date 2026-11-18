"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { business } from "@/data/business";
import { collectionGroups, collections } from "@/data/collections";
import { concepts, type ConceptId } from "@/data/concepts";
import { conceptPath } from "@/lib/routes";
import { generalEnquiry, whatsappHref } from "@/lib/whatsapp";
import { Wordmark } from "@/components/shared/Wordmark";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.4-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.7.7-3.1-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4c.5.2 1 .4 1.5.5a3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

export function ConceptNav({ concept }: { concept: ConceptId }) {
  const theme = concepts[concept];
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Home", conceptPath(concept)],
    ["Collections", conceptPath(concept, "/collections")],
    ["Gold", conceptPath(concept, "/collections/gold")],
    ["Diamond", conceptPath(concept, "/collections/diamond")],
    ["Silver", conceptPath(concept, "/collections/silver")],
    ["Bridal", conceptPath(concept, "/collections/bridal")],
    ["360°", conceptPath(concept, "/experience-360")],
    ["About", conceptPath(concept, "/about")],
    ["Contact", conceptPath(concept, "/contact")],
  ] as const;

  return (
    <>
      {theme.key === "maison" ? (
        <div className="announce">Showroom open daily · {business.hours.label} · Vidyadhar Nagar, Jaipur</div>
      ) : null}
      {theme.key === "heritage" ? (
        <div className="announce" style={{ background: "#2c1218" }}>
          {business.address.area}, {business.address.city} · {business.phoneDisplay}
        </div>
      ) : null}
      <header className={`site-header ${solid ? "is-solid" : ""}`}>
        <div className="wrap header-inner" style={{ position: "relative" }}>
          <Link href={conceptPath(concept)} aria-label="Diksha Jewellers home">
            <Wordmark />
          </Link>
          <nav className="nav-links" aria-label="Primary">
            {links.slice(0, 2).map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
            <div className="dropdown" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <button className="nav-button" type="button" aria-expanded={drop} onClick={() => setDrop((value) => !value)}>
                Jewellery
              </button>
              {drop ? (
                <div className="dropdown-panel">
                  {collectionGroups.map((group) => (
                    <div key={group.id}>
                      <strong>{group.label}</strong>
                      {collections
                        .filter((collection) => collection.group === group.id)
                        .map((collection) => (
                          <Link key={collection.slug} href={conceptPath(concept, `/collections/${collection.slug}`)} onClick={() => setDrop(false)}>
                            {collection.name}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {links.slice(6).map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div style={{ position: "relative" }}>
              <button className="icon-btn" type="button" aria-label="Search sample pieces" onClick={() => setSearchOpen((value) => !value)}>
                <Search size={16} />
              </button>
              {searchOpen ? (
                <form className="search-pop" action={conceptPath(concept, "/search")}>
                  <input name="q" aria-label="Search" placeholder="Search sample pieces" autoFocus />
                </form>
              ) : null}
            </div>
            <a className="btn btn-gold desktop-only" href={whatsappHref(generalEnquiry)} target="_blank" rel="noopener noreferrer">
              <WhatsAppGlyph /> WhatsApp
            </a>
            <button className="icon-btn menu-toggle" type="button" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>
      {open ? (
        <div className="mobile-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <Wordmark />
            <button className="icon-btn" type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>
          {links.map(([label, href]) => (
            <Link key={label} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <form action={conceptPath(concept, "/search")} className="search-pop" style={{ position: "static", width: "100%" }}>
            <input name="q" aria-label="Search" placeholder="Search sample pieces" />
          </form>
          <a className="btn btn-primary" href={whatsappHref(generalEnquiry)} target="_blank" rel="noopener noreferrer">
            <WhatsAppGlyph /> WhatsApp the showroom
          </a>
        </div>
      ) : null}
    </>
  );
}
