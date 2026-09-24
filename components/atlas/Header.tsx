"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Mark";

const NAV = [
  { href: "/realisations", key: "work" },
  { href: "/offres", key: "offers" },
  { href: "/blog", key: "journal" },
  { href: "/about", key: "about" },
] as const;

// En-tête blanc posé sur la bande bleue qui ouvre chaque page.
export function Header() {
  const t = useTranslations("shell");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  const current = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined;

  const brand = (
    <Link href="/" className="brand" aria-label={t("homeAria")}>
      <Logo />
    </Link>
  );

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        {brand}
        <nav className="site-nav" aria-label={t("mainNav")}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)}>
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
        <Link href="/contact" className="nav-cta">
          {t("cta")}
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen(true)}
        >
          <span className="menu-toggle-lines" aria-hidden="true" />
          {t("menu")}
        </button>
      </div>

      <div
        id="menu-panel"
        className="menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label={t("menu")}
        hidden={!open}
      >
        <div className="wrap site-header-inner">
          {brand}
          <button
            ref={closeRef}
            type="button"
            className="menu-toggle"
            onClick={() => setOpen(false)}
          >
            {t("close")}
          </button>
        </div>
        <div className="wrap">
          <nav className="menu-panel-nav" aria-label={t("mainNav")}>
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} aria-current={current(item.href)}>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
        <div className="wrap menu-panel-foot">
          <Link href="/contact" className="btn btn-light">
            {t("cta")}
          </Link>
          <LocaleSwitcher />
        </div>
      </div>
    </header>
  );
}
