import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { getPostPaths, postAlternatePaths } from "@/lib/blog";
import { alternatesFor } from "@/lib/meta";

// Pages statiques, déclinées dans chaque langue.
const staticPaths = [
  "/",
  "/about",
  "/faq",
  "/blog",
  "/realisations/permapaysage",
  "/links",
  "/legal/mentions-legales",
  "/legal/politique-confidentialite",
  "/legal/cgv",
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  for (const path of staticPaths)
    for (const locale of locales) {
      const { canonical, languages } = alternatesFor(path, locale);
      if (canonical)
        entries.push({ url: canonical, alternates: { languages } });
    }
  for (const post of await getPostPaths()) {
    const { canonical, languages } = alternatesFor(
      postAlternatePaths(post),
      post.language as Locale,
    );
    const lastModified =
      post.updatedAt ?? post._updatedAt ?? post.publishedAt ?? undefined;
    if (canonical)
      entries.push({
        url: canonical,
        alternates: { languages },
        ...(lastModified ? { lastModified } : {}),
      });
  }
  return entries;
}
