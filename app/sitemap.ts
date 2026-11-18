import type { MetadataRoute } from "next";
import { business } from "@/data/business";
import { collections } from "@/data/collections";
import { conceptIds } from "@/data/concepts";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = business.siteUrl;
  const entries: MetadataRoute.Sitemap = [{ url: base, changeFrequency: "weekly", priority: 1 }];
  for (const concept of conceptIds) {
    for (const path of ["", "/collections", "/about", "/contact", "/experience-360", "/search"]) {
      entries.push({ url: `${base}/${concept}${path}`, changeFrequency: "weekly", priority: path ? 0.7 : 0.9 });
    }
    for (const collection of collections) {
      entries.push({ url: `${base}/${concept}/collections/${collection.slug}`, changeFrequency: "weekly", priority: 0.6 });
    }
    for (const product of products) {
      entries.push({ url: `${base}/${concept}/product/${product.slug}`, changeFrequency: "weekly", priority: 0.5 });
    }
    for (const product of products.filter((item) => item.sequenceId)) {
      entries.push({ url: `${base}/${concept}/experience-360/${product.slug}`, changeFrequency: "monthly", priority: 0.5 });
    }
  }
  return entries;
}
