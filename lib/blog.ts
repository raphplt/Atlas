import { posts as journalPosts } from "@/content/journal";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { isSanityConfigured } from "@/sanity/env";
import { sectionsToPortableText } from "./portable-text";
import { sanityFetch } from "./sanity/fetch";
import {
  POST_PATHS_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  tags,
  type Post,
  type PostCard,
  type PostPath,
} from "./sanity/queries";

/**
 * Accès aux articles du journal.
 * Source : Sanity si configuré, sinon les articles statiques de content/journal.ts (FR uniquement).
 */

const FALLBACK_AUTHOR = {
  name: "Raphaël Plassart",
  role: "Designer & développeur",
  url: null,
};

function fallbackPost(p: (typeof journalPosts)[number]): Post {
  return {
    _id: `journal-${p.slug}`,
    title: p.title,
    slug: p.slug,
    language: defaultLocale,
    excerpt: p.description,
    cover: null,
    publishedAt: null, // pas de date connue pour les articles statiques
    updatedAt: null,
    readingTime: p.readingTime,
    category: p.category,
    author: FALLBACK_AUTHOR,
    body: sectionsToPortableText(p.sections),
    seo: null,
    translations: [{ language: defaultLocale, slug: p.slug }],
  };
}

export async function getPosts(
  locale: Locale,
  limit = 100,
): Promise<PostCard[]> {
  if (!isSanityConfigured)
    return locale === defaultLocale
      ? journalPosts.slice(0, limit).map(fallbackPost)
      : [];
  return (
    (await sanityFetch<PostCard[]>({
      query: POSTS_QUERY,
      params: { language: locale, limit },
      tags: [tags.post],
    })) ?? []
  );
}

export async function getPost(
  locale: Locale,
  slug: string,
): Promise<Post | null> {
  if (!isSanityConfigured) {
    if (locale !== defaultLocale) return null;
    const p = journalPosts.find((p) => p.slug === slug);
    return p ? fallbackPost(p) : null;
  }
  return sanityFetch<Post>({
    query: POST_QUERY,
    params: { language: locale, slug },
    tags: [tags.post],
  });
}

/** Tous les chemins d'articles, toutes langues confondues. */
export async function getPostPaths(): Promise<PostPath[]> {
  if (!isSanityConfigured)
    return journalPosts.map((p) => ({
      slug: p.slug,
      language: defaultLocale,
      publishedAt: null,
      updatedAt: null,
      _updatedAt: null,
      translations: [{ language: defaultLocale, slug: p.slug }],
    }));
  const paths =
    (await sanityFetch<PostPath[]>({
      query: POST_PATHS_QUERY,
      tags: [tags.post],
    })) ?? [];
  return paths.filter((p) => (locales as readonly string[]).includes(p.language));
}

/** Slug de l'article dans chaque langue disponible → chemin /blog/<slug>. */
export function postAlternatePaths(
  post: Pick<Post, "slug" | "language" | "translations">,
): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {
    [post.language as Locale]: `/blog/${post.slug}`,
  };
  for (const t of post.translations ?? []) {
    if (t.slug && (locales as readonly string[]).includes(t.language))
      out[t.language as Locale] = `/blog/${t.slug}`;
  }
  return out;
}
