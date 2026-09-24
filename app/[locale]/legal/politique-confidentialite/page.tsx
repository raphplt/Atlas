// TODO(i18n) : pas encore de version italienne des textes légaux — repli sur le français (i18n/request.ts).
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";
import { H4 } from "@/components/ui/typography";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/politique-confidentialite">) {
  const { locale } = await params;
  return pageMetadata({
    locale: locale as Locale,
    path: "/legal/politique-confidentialite",
    page: "legalPrivacy",
  });
}

export default async function Politique({ params }: PageProps<"/[locale]/legal/politique-confidentialite">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "legal.privacy" });

  return (
    <main id="main-content" className="article-wrap">
      <h1 className="h2 mb-8">{t("title")}</h1>
      <p className="text-muted-foreground mb-8">{t("lastUpdate")}</p>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <H4 className="mb-4">{t("sections.introduction.title")}</H4>
          <p>{t("sections.introduction.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.controller.title")}</H4>
          <p>{t("sections.controller.content")}</p>
          <p>
            <strong>{t("sections.controller.name")}</strong>
            <br />
            {t("sections.controller.status")}
            <br />
            {t("sections.controller.siret")}
            <br />
            {t("sections.controller.address")}
            <br />
            {t("sections.controller.email")}
            <br />
            {t("sections.controller.phone")}
          </p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.data.title")}</H4>
          <p>
            <strong>{t("sections.data.formTitle")}</strong>
          </p>
          <ul className="list-disc pl-6">
            {t
              .raw("sections.data.formItems")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>
            <strong>{t("sections.data.autoTitle")}</strong>
          </p>
          <ul className="list-disc pl-6">
            {t
              .raw("sections.data.autoItems")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.purposes.title")}</H4>
          <p>{t("sections.purposes.content")}</p>
          <ul className="list-disc pl-6">
            {t
              .raw("sections.purposes.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.recipients.title")}</H4>
          <p>{t("sections.recipients.content")}</p>
          <ul className="list-disc pl-6">
            {t
              .raw("sections.recipients.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>
            <em>{t("sections.recipients.noSale")}</em>
          </p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.transfers.title")}</H4>
          <p>{t("sections.transfers.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.retention.title")}</H4>
          <ul className="list-disc pl-6">
            {t
              .raw("sections.retention.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.cookies.title")}</H4>
          <p>{t("sections.cookies.intro")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.rights.title")}</H4>
          <p>{t("sections.rights.content")}</p>
          <ul className="list-disc pl-6">
            {t
              .raw("sections.rights.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>{t("sections.rights.contact")}</p>
          <p>
            <strong>{t("sections.rights.cnil")}</strong>
          </p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.security.title")}</H4>
          <p>{t("sections.security.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.automated.title")}</H4>
          <p>{t("sections.automated.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.minors.title")}</H4>
          <p>{t("sections.minors.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.modifications.title")}</H4>
          <p>{t("sections.modifications.content")}</p>
        </section>

        <section className="mb-8">
          <H4 className="mb-4">{t("sections.contact.title")}</H4>
          <p>
            {t("sections.contact.content")}
            <br />
            {t("sections.contact.email")}
            <br />
            {t("sections.contact.phone")}
            <br />
            {t("sections.contact.address")}
          </p>
        </section>
      </div>
    </main>
  );
}
