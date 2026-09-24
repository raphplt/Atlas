import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/atlas/ContactForm";
import { PageHero } from "@/components/atlas/PageHero";
import type { Locale } from "@/i18n/routing";
import { pageMetadata, siteMeta } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/contact", page: "contact" });
}

export default async function Contact({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")} />
      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-aside">
            <h2 className="h3">{t("nextTitle")}</h2>
            <ul className="offer-list">
              {(t.raw("next") as string[]).map((step) => (
                <li key={step}>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <p className="body">
              {t("direct")}
            </p>
            <a href={`mailto:${siteMeta.email}`} className="mail">
              {siteMeta.email}
            </a>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
