"use client";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

// Nom de chaque langue dans sa propre langue (« Français », « English », « Italiano »).
function nativeName(code: string) {
  const name = new Intl.DisplayNames([code], { type: "language" }).of(code);
  return name ? name.charAt(0).toLocaleUpperCase(code) + name.slice(1) : code;
}

// Liens simples (pas de menu déroulant) : l'URL cible est l'URL canonique de la
// même page dans l'autre langue (/about, /en/about…).
export function LocaleSwitcher() {
  const t = useTranslations("shell");
  const current = useLocale();
  const pathname = usePathname();
  return (
    <nav className="locales" aria-label={t("language")}>
      {locales.map((code) => (
        <a
          key={code}
          href={getPathname({ href: pathname, locale: code })}
          hrefLang={code}
          lang={code}
          aria-label={nativeName(code)}
          aria-current={code === current ? "true" : undefined}
        >
          {code.toUpperCase()}
        </a>
      ))}
    </nav>
  );
}
