// Données fixes du site (images, liens, faits vérifiés). Les textes sont dans messages/*.json.

export const permapaysage = {
  slug: "permapaysage",
  client: "Permapaysage",
  url: "https://www.permapaysage.fr",
  year: 2026,
  image: { src: "/images/work/permapaysage.webp", width: 3200, height: 1840 },
  testimonialUrl:
    "https://www.linkedin.com/posts/permapaysage_permapaysage-%C3%A9co-paysagiste-%C3%A0-vallet-activity-7441431187446861824-4d9D",
};

export const portrait = {
  src: "/images/Raphael-Plassart.png",
  width: 1024,
  height: 1536,
};

const QUOTES: Record<string, [string, string]> = {
  fr: ["« ", " »"],
  it: ["«", "»"],
  en: ["“", "”"],
};

/** Encadre une citation avec les guillemets de la langue. */
export function quoted(text: string, locale: string) {
  const [open, close] = QUOTES[locale] ?? QUOTES.en;
  return `${open}${text}${close}`;
}
