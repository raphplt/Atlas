// TODO(i18n) : pas encore de version italienne des textes légaux — repli sur le français (i18n/request.ts).
import { H4 } from "@/components/ui/typography";
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
    <main id="main-content" className="article-wrap">
      <h1 className="h2 mb-8">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("lastUpdate")}</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <H4 className="mb-4">{t("sections.publisher.title")}</H4>
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
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.director.title")}</H4>
          <p>{t("sections.director.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.contact.title")}</H4>
          <p>
            {t("sections.contact.email")}
            <br />
            {t("sections.contact.phone")}
            <br />
            {t("sections.contact.website")}
          </p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.hosting.title")}</H4>
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
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.intellectual.title")}</H4>
          <p>{t("sections.intellectual.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.data.title")}</H4>
          <p>{t("sections.data.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.cookies.title")}</H4>
          <p>{t("sections.cookies.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.liability.title")}</H4>
          <p>{t("sections.liability.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.links.title")}</H4>
          <p>{t("sections.links.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.law.title")}</H4>
          <p>{t("sections.law.content")}</p>
        </section>
      </div>
    </main>
  );
}
