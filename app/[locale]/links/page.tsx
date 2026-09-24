import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/atlas/PageHero";
import type { Locale } from "@/i18n/routing";
import { localizedPath, pageMetadata, siteMeta } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps<"/[locale]/links">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/links", page: "links" });
}

export default async function Links({ params }: PageProps<"/[locale]/links">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "links" });
  // Le portfolio existe en FR et EN (pas en IT) : les autres langues pointent vers l'anglais.
  const portfolioUrl = locale === "fr" ? siteMeta.portfolio : `${siteMeta.portfolio}/en`;
  const links = [
    [t("site"), localizedPath("/", locale), false],
    [t("portfolio"), portfolioUrl, true],
    [t("contact"), `mailto:${siteMeta.email}`, false],
    [t("linkedin"), siteMeta.linkedin, true],
    [t("github"), siteMeta.github, true],
    [t("kofi"), "https://ko-fi.com/raphplt", true],
  ] as const;

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")} />
      <section className="section">
        <div className="wrap">
          <ul className="link-list">
            {links.map(([label, href, external]) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
