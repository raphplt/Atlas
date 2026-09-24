import { defaultLocale, locales } from "../i18n/routing";

// Langues du Studio = langues du site (source unique : i18n/routing.ts).
export const supportedLanguages = locales.map((id) => ({
  id,
  title: new Intl.DisplayNames(["fr"], { type: "language" }).of(id) ?? id,
}));

export { defaultLocale, locales };
