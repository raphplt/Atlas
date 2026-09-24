import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteMeta } from "@/lib/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Mark";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("shell.nav");
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" aria-label="Atlas">
              <Logo />
            </Link>
            <p>{t("tagline")}</p>
            <a className="mail" href={`mailto:${siteMeta.email}`}>
              {siteMeta.email}
            </a>
          </div>
          <nav className="footer-nav" aria-label={t("siteNav")}>
            <Link href="/realisations">{nav("work")}</Link>
            <Link href="/offres">{nav("offers")}</Link>
            <Link href="/blog">{nav("journal")}</Link>
            <Link href="/about">{nav("about")}</Link>
            <Link href="/faq">{t("faq")}</Link>
            <Link href="/contact">{t("contact")}</Link>
            <a href={siteMeta.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={siteMeta.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>{t("copyright", { year: new Date().getFullYear() })}</span>
          <nav aria-label={t("legalNav")}>
            <Link href="/legal/mentions-legales">{t("mentions")}</Link>
            <Link href="/legal/politique-confidentialite">{t("privacy")}</Link>
            <Link href="/legal/cgv">{t("terms")}</Link>
          </nav>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
