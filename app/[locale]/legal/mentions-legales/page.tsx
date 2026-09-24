import { PageHero } from "@/components/atlas/PageHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/mentions-legales">) {
  const { locale } = await params;
  return pageMetadata({
    locale: locale as Locale,
    path: "/legal/mentions-legales",
    page: "legalMentions",
  });
}

export default async function MentionsLegales({ params }: PageProps<"/[locale]/legal/mentions-legales">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "legal.mentions" });

  return (
    <main id="main-content" className="legal">
      <PageHero title={t("title")}>
        <p className="legal-date">{t("lastUpdate")}</p>
      </PageHero>
      <section className="section">
        <div className="wrap prose">
        <>
          <h2>{t("sections.publisher.title")}</h2>
          <p>
            <strong>{t("sections.publisher.name")}</strong>
            <br />
            {t("sections.publisher.status")}
            <br />
            {t("sections.publisher.activity")}
            <br />
            {t("sections.publisher.siren")}
            <br />
            {t("sections.publisher.siret")}
            <br />
            {t("sections.publisher.ape")}
            <br />
            {t("sections.publisher.address")}
            <br />
            <em>{t("sections.publisher.tva")}</em>
          </p>
        </>

        <>
          <h2>{t("sections.director.title")}</h2>
          <p>{t("sections.director.content")}</p>
        </>

        <>
          <h2>{t("sections.contact.title")}</h2>
          <p>
            {t("sections.contact.email")}
            <br />
            {t("sections.contact.phone")}
            <br />
            {t("sections.contact.website")}
          </p>
        </>

        <>
          <h2>{t("sections.hosting.title")}</h2>
          <p>
            {t("sections.hosting.content")}
            <br />
            <strong>{t("sections.hosting.company")}</strong>
            <br />
            {t("sections.hosting.address")}
            <br />
            {t("sections.hosting.city")}
            <br />
            {t("sections.hosting.country")}
            <br />
            {t("sections.hosting.website")}
          </p>
        </>

        <>
          <h2>{t("sections.intellectual.title")}</h2>
          <p>{t("sections.intellectual.content")}</p>
        </>

        <>
          <h2>{t("sections.data.title")}</h2>
          <p>{t("sections.data.content")}</p>
        </>

        <>
          <h2>{t("sections.cookies.title")}</h2>
          <p>{t("sections.cookies.content")}</p>
        </>

        <>
          <h2>{t("sections.liability.title")}</h2>
          <p>{t("sections.liability.content")}</p>
        </>

        <>
          <h2>{t("sections.links.title")}</h2>
          <p>{t("sections.links.content")}</p>
        </>

        <>
          <h2>{t("sections.law.title")}</h2>
          <p>{t("sections.law.content")}</p>
        </>
      </div>
      </section>
    </main>
  );
}
