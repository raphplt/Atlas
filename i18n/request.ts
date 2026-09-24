import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

async function loadMessages(locale: string): Promise<Messages> {
  return (await import(`../messages/${locale}.json`)).default;
}

// Fusion profonde : les clés absentes d'une langue retombent sur le français.
function merge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    out[key] =
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
        ? merge(current as Messages, value as Messages)
        : value;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const messages =
    locale === routing.defaultLocale
      ? await loadMessages(locale)
      : merge(
          await loadMessages(routing.defaultLocale),
          await loadMessages(locale),
        );
  return { locale, messages };
});
