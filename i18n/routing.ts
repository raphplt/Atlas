import { defineRouting } from "next-intl/routing";

// Ajouter une langue = ajouter son code ici + un fichier messages/<code>.json.
export const locales = ["fr", "en", "it"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Les URL françaises restent sans préfixe (/about), les autres sont préfixées (/en/about).
  localePrefix: "as-needed",
});
