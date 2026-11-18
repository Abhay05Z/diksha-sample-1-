"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { conceptIds, type ConceptId } from "@/data/concepts";

function switchedPath(pathname: string, from: ConceptId, to: ConceptId) {
  if (pathname === `/${from}` || pathname.startsWith(`/${from}/`)) {
    return `/${to}${pathname.slice(from.length + 1)}`;
  }
  return `/${to}`;
}

export function ConceptSwitch({ concept }: { concept: ConceptId }) {
  const pathname = usePathname();

  return (
    <nav className="concept-switch" aria-label="Switch concept">
      <Link href="/">Choose</Link>
      {conceptIds.map((id, index) => (
        <Link key={id} href={switchedPath(pathname, concept, id)} className={id === concept ? "is-on" : ""} aria-current={id === concept ? "page" : undefined}>
          {index + 1}
        </Link>
      ))}
    </nav>
  );
}
