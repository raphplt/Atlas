import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/routing";

export const siteMeta = {
  url: "https://atlas.raphael-plassart.com",
  author: "Raphaël Plassart",
  siteName: "Atlas",
  email: "contact@raphael-plassart.com",
  linkedin: "https://www.linkedin.com/in/rapha%C3%ABl-plassart/",
  github: "https://github.com/raphplt",
  ogImage: "/opengraph-image",
};

/** Chemin localisé : /about (fr), /en/about, /it/about… */
export function localizedPath(path: string, locale: Locale): string {
  return getPathname({ href: path, locale });
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteMeta.url).toString();
}

/**
 * Canonical + hreflang.
 * `paths` : soit un chemin identique pour toutes les langues, soit un chemin
 * par langue disponible (ex. articles dont le slug est traduit).
 */
export function alternatesFor(
  paths: string | Partial<Record<Locale, string>>,
  locale: Locale,
): { canonical: string | undefined; languages: Record<string, string> } {
  const byLocale: Partial<Record<Locale, string>> =
    typeof paths === "string"
      ? Object.fromEntries(locales.map((l) => [l, paths]))
      : paths;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = byLocale[l];
    if (p) languages[l] = absoluteUrl(localizedPath(p, l));
  }
  const fallback = languages[defaultLocale] ?? Object.values(languages)[0];
  if (fallback) languages["x-default"] = fallback;
  const own = byLocale[locale];
  return {
    canonical: own ? absoluteUrl(localizedPath(own, locale)) : fallback,
    languages,
  };
}

type PageKey =
  | "about"
  | "blog"
  | "faq"
  | "links"
  | "success"
  | "permapaysage"
  | "legalMentions"
  | "legalPrivacy"
  | "legalCgv"
  | "notFound";

/** Métadonnées standard d'une page : titre/description traduits, canonical et hreflang. */
export async function pageMetadata({
  locale,
  path,
  page,
  noindex = false,
}: {
  locale: Locale;
  path: string;
  page?: PageKey;
  noindex?: boolean;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = page ? t(`pages.${page}.title`) : undefined;
  const description =
    page && t.has(`pages.${page}.description`)
      ? t(`pages.${page}.description`)
      : t("description");
  const alternates = alternatesFor(path, locale);
  return {
    ...(title ? { title } : {}),
    description,
    alternates,
    openGraph: {
      type: "website",
      siteName: siteMeta.siteName,
      locale: t("ogLocale"),
      url: alternates.canonical,
      title: title ?? t("defaultTitle"),
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
