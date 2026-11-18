import type { ConceptId } from "@/data/concepts";

export function conceptPath(concept: ConceptId, path = "") {
  if (!path) return `/${concept}`;
  return `/${concept}${path.startsWith("/") ? path : `/${path}`}`;
}
