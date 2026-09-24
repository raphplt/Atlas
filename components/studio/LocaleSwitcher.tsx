"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

// Nom de chaque langue dans sa propre langue (« français », « English », « italiano »).
function nativeName(code: string) {
  const name = new Intl.DisplayNames([code], { type: "language" }).of(code);
  return name ? name.charAt(0).toLocaleUpperCase(code) + name.slice(1) : code;
}

export function LocaleSwitcher() {
  const t = useTranslations("shell");
  const current = useLocale();
  const pathname = usePathname();
  return (
    <nav className="locale-switcher" aria-label={t("language")}>
      {locales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          hrefLang={code}
          lang={code}
          aria-label={nativeName(code)}
          aria-current={code === current ? "true" : undefined}
        >
          {code.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
