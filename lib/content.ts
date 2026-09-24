// Données fixes du site (images, liens, faits vérifiés). Les textes sont dans messages/*.json.

export const permapaysage = {
  slug: "permapaysage",
  client: "Permapaysage",
  url: "https://www.permapaysage.fr",
  year: 2026,
  image: { src: "/images/work/permapaysage.png", width: 1600, height: 920 },
  testimonialUrl:
    "https://www.linkedin.com/posts/permapaysage_permapaysage-%C3%A9co-paysagiste-%C3%A0-vallet-activity-7441431187446861824-4d9D",
};

export const products = [
  {
    key: "qoredb",
    name: "QoreDB",
    url: "https://qoredb.com",
    image: { src: "/images/work/qoredb.png", width: 1436, height: 946 },
  },
  {
    key: "tcgNexus",
    name: "TCG Nexus",
    url: "https://tcg-nexus.org",
    image: { src: "/images/work/tcg-nexus.webp", width: 2000, height: 1213 },
  },
] as const;

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
