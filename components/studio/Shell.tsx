import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteMeta } from "@/lib/meta";
import { LocaleSwitcher } from "./LocaleSwitcher";
export function Header() {
  const t = useTranslations("shell");
  const nav = (
    <>
      <Link href="/#realisations">{t("nav.work")}</Link>
      <Link href="/#expertises">{t("nav.expertise")}</Link>
      <Link href="/about">{t("nav.studio")}</Link>
      <Link href="/blog">{t("nav.journal")}</Link>
    </>
  );
  return (
    <header className="studio-header">
      <Link href="/" className="wordmark" aria-label={t("homeAria")}>
        atlas<span>®</span>
      </Link>
      <nav aria-label={t("mainNav")}>{nav}</nav>
      <LocaleSwitcher />
      <Link className="header-contact" href="/#contact">
        {t("cta")} <span>↗</span>
      </Link>
      <details className="mobile-menu">
        <summary>
          {t("menu")} <span>＋</span>
        </summary>
        <nav aria-label={t("mobileNav")}>
          {nav}
          <Link href="/#contact">{t("cta")} ↗</Link>
        </nav>
      </details>
    </header>
  );
}
export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="studio-footer">
      <div className="footer-top">
        <Link href="/" className="wordmark">
          atlas<span>®</span>
        </Link>
        <p>{t("tagline")}</p>
        <a href={`mailto:${siteMeta.email}`}>{t("writeMe")} ↗</a>
      </div>
      <div className="footer-bottom">
        <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        <nav aria-label={t("legalNav")}>
          <Link href="/legal/mentions-legales">{t("mentions")}</Link>
          <Link href="/legal/politique-confidentialite">{t("privacy")}</Link>
          <Link href="/legal/cgv">{t("terms")}</Link>
          <Link href="/faq">{t("faq")}</Link>
        </nav>
        <a href={siteMeta.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
      </div>
    </footer>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="tiny-cross">✳</span> {children}
    </p>
  );
}
export function Art({ small = false }: { small?: boolean }) {
  return (
    <div className={`atlas-art ${small ? "small-art" : ""}`} aria-hidden="true">
      <div className="art-grid" />
      <span className="art-coordinate">FIG. 01 — EXPLORER LES POSSIBLES</span>
      <div className="orbit-sphere">
        {Array.from({ length: 13 }, (_, i) => (
          <i key={i} style={{ transform: `rotate(${i * 14}deg)` }} />
        ))}
      </div>
      <span className="art-star">✳</span>
      <span className="art-caption">L’intention fait la différence.</span>
      <span className="art-index">A—01</span>
    </div>
  );
}
