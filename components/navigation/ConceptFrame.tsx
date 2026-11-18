import type { ReactNode } from "react";
import type { ConceptId } from "@/data/concepts";
import { SiteChrome } from "@/components/navigation/SiteChrome";

export function ConceptFrame({
  concept,
  className,
  children,
}: {
  concept: ConceptId;
  className: string;
  children: ReactNode;
}) {
  return (
    <SiteChrome concept={concept} className={className}>
      {children}
    </SiteChrome>
  );
}
