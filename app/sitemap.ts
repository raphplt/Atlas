import type { MetadataRoute } from "next";
import { posts } from "@/content/journal";
import { siteMeta } from "@/lib/meta";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/faq",
    "/blog",
    "/realisations/permapaysage",
    "/legal/mentions-legales",
    "/legal/politique-confidentialite",
    "/legal/cgv",
    ...posts.map((p) => `/blog/${p.slug}`),
  ].map((path) => ({ url: `${siteMeta.url}${path}` }));
}
