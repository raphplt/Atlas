import { defineQuery } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImage } from "./image";

/* -------------------------------------------------------------------------- */
/* Fragments                                                                  */
/* -------------------------------------------------------------------------- */

const image = /* groq */ `{
  asset,
  alt,
  caption,
  hotspot,
  crop,
  "dimensions": asset->metadata.dimensions{ width, height },
  "lqip": asset->metadata.lqip
}`;

const richText = /* groq */ `[]{
  ...,
  _type == "imageWithAlt" => ${image}
}`;

// Traductions d'un document (plugin @sanity/document-internationalization).
const translations = /* groq */ `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
  "language": value->language,
  "slug": value->slug.current
}`;

const postCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  language,
  excerpt,
  "cover": cover${image},
  publishedAt,
  updatedAt,
  readingTime,
  "category": category->title,
  "author": author->{ name, role, url }
`;

/* -------------------------------------------------------------------------- */
/* Articles                                                                   */
/* -------------------------------------------------------------------------- */

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && language == $language && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc)[0...$limit]{ ${postCard} }
`);

export const POST_QUERY = defineQuery(`
  *[_type == "post" && language == $language && slug.current == $slug][0]{
    ${postCard},
    "body": body${richText},
    seo{ title, description, "ogImage": ogImage${image} },
    ${translations}
  }
`);

/** Tous les articles publiés, toutes langues (sitemap, RSS, generateStaticParams). */
export const POST_PATHS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(language) && publishedAt <= now()]
    | order(publishedAt desc){
      "slug": slug.current,
      language,
      publishedAt,
      updatedAt,
      _updatedAt,
      ${translations}
    }
`);

/* -------------------------------------------------------------------------- */
/* Réalisations, témoignages, réglages                                        */
/* -------------------------------------------------------------------------- */

const projectCard = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  language,
  client,
  kind,
  url,
  year,
  role,
  stack,
  summary,
  featured,
  order,
  "cover": cover${image}
`;

const testimonialFields = /* groq */ `
  _id,
  quote,
  authorName,
  role,
  company,
  url,
  "photo": photo${image}
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && language == $language && defined(slug.current)]
    | order(coalesce(order, 999) asc, year desc){ ${projectCard} }
`);

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && language == $language && slug.current == $slug][0]{
    ${projectCard},
    "gallery": gallery[]${image},
    "challenge": challenge${richText},
    "approach": approach${richText},
    "results": results${richText},
    metrics[]{ label, value, note },
    "testimonial": testimonial->{ ${testimonialFields} },
    seo{ title, description, "ogImage": ogImage${image} },
    ${translations}
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial" && language == $language] | order(_createdAt desc){ ${testimonialFields} }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{ email, availability, socialLinks[]{ label, url } }
`);

/* -------------------------------------------------------------------------- */
/* Types des résultats                                                        */
/* -------------------------------------------------------------------------- */

export type Translation = { language: string; slug: string | null };

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  language: string;
  excerpt: string | null;
  cover: SanityImage | null;
  publishedAt: string | null;
  updatedAt: string | null;
  readingTime: number | null;
  category: string | null;
  author: { name: string; role: string | null; url: string | null } | null;
};

export type Seo = {
  title: string | null;
  description: string | null;
  ogImage: SanityImage | null;
} | null;

export type Post = PostCard & {
  body: PortableTextBlock[] | null;
  seo: Seo;
  translations: Translation[] | null;
};

export type PostPath = {
  slug: string;
  language: string;
  publishedAt: string | null;
  updatedAt: string | null;
  _updatedAt: string | null;
  translations: Translation[] | null;
};

export type Testimonial = {
  _id: string;
  quote: string;
  authorName: string;
  role: string | null;
  company: string | null;
  url: string | null;
  photo: SanityImage | null;
};

export type ProjectCard = {
  _id: string;
  title: string;
  slug: string;
  language: string;
  client: string | null;
  kind: "client" | "product";
  url: string | null;
  year: number | null;
  role: string | null;
  stack: string[] | null;
  summary: string | null;
  featured: boolean | null;
  order: number | null;
  cover: SanityImage | null;
};

export type Project = ProjectCard & {
  gallery: SanityImage[] | null;
  challenge: PortableTextBlock[] | null;
  approach: PortableTextBlock[] | null;
  results: PortableTextBlock[] | null;
  metrics: { label: string; value: string; note: string | null }[] | null;
  testimonial: Testimonial | null;
  seo: Seo;
  translations: Translation[] | null;
};

export type SiteSettings = {
  email: string | null;
  availability: string | null;
  socialLinks: { label: string; url: string }[] | null;
} | null;

/** Tags de cache, invalidés par le webhook app/api/revalidate. */
export const tags = {
  post: "post",
  project: "project",
  testimonial: "testimonial",
  siteSettings: "siteSettings",
} as const;
