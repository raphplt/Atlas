import type { PortableTextBlock } from "@portabletext/react";
import { getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/routing";
import { isSanityConfigured } from "@/sanity/env";
import { permapaysage } from "./content";
import { textToPortableText } from "./portable-text";
import { sanityFetch } from "./sanity/fetch";
import { hasAsset, urlForImage, type SanityImage } from "./sanity/image";
import {
  PROJECT_QUERY,
  PROJECTS_QUERY,
  tags,
  type Project,
  type ProjectCard,
} from "./sanity/queries";

/**
 * Réalisations : Sanity si configuré et rempli, sinon le contenu statique
 * (lib/content.ts + messages/<langue>.json, clé « work.items »).
 */

export type WorkImage = { src: string; alt: string; width: number; height: number };

export type WorkItem = {
  slug: string;
  title: string;
  kind: "client" | "product";
  client: string | null;
  url: string | null;
  year: number | null;
  role: string | null;
  summary: string | null;
  fact: string | null;
  image: WorkImage | null;
  /** Étude de cas publiée sur le site (sinon, lien vers le produit). */
  hasPage: boolean;
};

export type WorkDetail = WorkItem & {
  lead: string | null;
  sections: {
    title: string;
    body: PortableTextBlock[];
    image?: WorkImage;
    link?: { label: string; href: string };
  }[];
  metrics: { label: string; value: string; note: string | null }[];
  quote: { text: string; author: string; url: string | null } | null;
  seo: { title: string | null; description: string | null };
  /** Slug de la même réalisation dans chaque langue disponible. */
  paths: Partial<Record<Locale, string>>;
};

function sanityImage(image: SanityImage | null, fallbackAlt: string): WorkImage | null {
  if (!hasAsset(image)) return null;
  const width = Math.min(image.dimensions?.width ?? 1600, 2000);
  const ratio = image.dimensions ? image.dimensions.height / image.dimensions.width : 0.6;
  return {
    src: urlForImage(image).width(width).url(),
    alt: image.alt ?? fallbackAlt,
    width,
    height: Math.round(width * ratio),
  };
}

function fromSanityCard(p: ProjectCard): WorkItem {
  return {
    slug: p.slug,
    title: p.title,
    kind: p.kind,
    client: p.client,
    url: p.url,
    year: p.year,
    role: p.role,
    summary: p.summary,
    fact: p.stack?.join(" · ") || null,
    image: sanityImage(p.cover, p.title),
    hasPage: p.kind === "client",
  };
}

/* -------------------------------------------------------------------------- */
/* Contenu statique                                                           */
/* -------------------------------------------------------------------------- */

async function staticItems(locale: Locale): Promise<WorkItem[]> {
  const t = await getTranslations({ locale, namespace: "work.items" });
  return [
    {
      slug: permapaysage.slug,
      title: t("permapaysage.title"),
      kind: "client",
      client: permapaysage.client,
      url: permapaysage.url,
      year: permapaysage.year,
      role: t("permapaysage.role"),
      summary: t("permapaysage.summary"),
      fact: t("permapaysage.fact"),
      image: { ...permapaysage.image, alt: t("permapaysage.imageAlt") },
      hasPage: true,
    },
  ];
}

async function staticDetail(locale: Locale, slug: string): Promise<WorkDetail | null> {
  if (slug !== permapaysage.slug) return null;
  const [item] = await staticItems(locale);
  const t = await getTranslations({ locale, namespace: "work.items.permapaysage" });
  const sections = t.raw("sections") as { title: string; text: string }[];
  const { companion } = permapaysage;
  return {
    ...item,
    lead: t("lead"),
    sections: [
      ...sections.map((s) => ({
        title: s.title,
        body: textToPortableText(s.text),
      })),
      {
        title: t("companion.title"),
        body: textToPortableText(t("companion.text")),
        image: { ...companion.image, alt: t("companion.imageAlt") },
        link: { label: t("companion.visit"), href: companion.url },
      },
    ],
    metrics: [],
    quote: {
      text: t("quote"),
      author: t("quoteBy"),
      url: permapaysage.testimonialUrl,
    },
    seo: { title: t("seoTitle"), description: t("seoDescription") },
    paths: Object.fromEntries(locales.map((l) => [l, `/realisations/${slug}`])),
  };
}

/* -------------------------------------------------------------------------- */
/* Accès                                                                      */
/* -------------------------------------------------------------------------- */

export async function getWork(locale: Locale): Promise<WorkItem[]> {
  if (isSanityConfigured) {
    const projects = await sanityFetch<ProjectCard[]>({
      query: PROJECTS_QUERY,
      params: { language: locale },
      tags: [tags.project],
    });
    if (projects?.length) return projects.map(fromSanityCard);
  }
  return staticItems(locale);
}

export async function getWorkDetail(
  locale: Locale,
  slug: string,
): Promise<WorkDetail | null> {
  if (isSanityConfigured) {
    const p = await sanityFetch<Project>({
      query: PROJECT_QUERY,
      params: { language: locale, slug },
      tags: [tags.project],
    });
    if (p) {
      const t = await getTranslations({ locale, namespace: "work.case" });
      const paths: Partial<Record<Locale, string>> = {
        [p.language as Locale]: `/realisations/${p.slug}`,
      };
      for (const tr of p.translations ?? [])
        if (tr.slug && (locales as readonly string[]).includes(tr.language))
          paths[tr.language as Locale] = `/realisations/${tr.slug}`;
      const sections = [
        { title: t("challenge"), body: p.challenge },
        { title: t("approach"), body: p.approach },
        { title: t("results"), body: p.results },
      ].filter((s): s is { title: string; body: PortableTextBlock[] } => !!s.body?.length);
      return {
        ...fromSanityCard(p),
        lead: p.summary,
        sections,
        metrics: p.metrics ?? [],
        quote: p.testimonial
          ? {
              text: p.testimonial.quote,
              author: [p.testimonial.authorName, p.testimonial.company]
                .filter(Boolean)
                .join(", "),
              url: p.testimonial.url,
            }
          : null,
        seo: { title: p.seo?.title ?? null, description: p.seo?.description ?? null },
        paths,
      };
    }
  }
  return staticDetail(locale, slug);
}

/** Slugs des études de cas, par langue (generateStaticParams, sitemap). */
export async function getWorkPaths(): Promise<{ locale: Locale; slug: string }[]> {
  const out: { locale: Locale; slug: string }[] = [];
  for (const locale of locales)
    for (const item of await getWork(locale))
      if (item.hasPage) out.push({ locale, slug: item.slug });
  return out;
}
