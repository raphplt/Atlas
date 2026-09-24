import { PageHero } from "@/components/atlas/PageHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";

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
    <main id="main-content" className="legal">
      <PageHero title={t("title")}>
        <p className="legal-date">{t("lastUpdate")}</p>
      </PageHero>
      <section className="section">
        <div className="wrap prose">
        <>
          <h2>{t("sections.introduction.title")}</h2>
          <p>{t("sections.introduction.content")}</p>
        </>

        <>
          <h2>{t("sections.controller.title")}</h2>
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
        </>

        <>
          <h2>{t("sections.data.title")}</h2>
          <p>
            <strong>{t("sections.data.formTitle")}</strong>
          </p>
          <ul>
            {t
              .raw("sections.data.formItems")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>
            <strong>{t("sections.data.autoTitle")}</strong>
          </p>
          <ul>
            {t
              .raw("sections.data.autoItems")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.purposes.title")}</h2>
          <p>{t("sections.purposes.content")}</p>
          <ul>
            {t
              .raw("sections.purposes.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.recipients.title")}</h2>
          <p>{t("sections.recipients.content")}</p>
          <ul>
            {t
              .raw("sections.recipients.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>
            <em>{t("sections.recipients.noSale")}</em>
          </p>
        </>

        <>
          <h2>{t("sections.transfers.title")}</h2>
          <p>{t("sections.transfers.content")}</p>
        </>

        <>
          <h2>{t("sections.retention.title")}</h2>
          <ul>
            {t
              .raw("sections.retention.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.cookies.title")}</h2>
          <p>{t("sections.cookies.intro")}</p>
        </>

        <>
          <h2>{t("sections.rights.title")}</h2>
          <p>{t("sections.rights.content")}</p>
          <ul>
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
        </>

        <>
          <h2>{t("sections.security.title")}</h2>
          <p>{t("sections.security.content")}</p>
        </>

        <>
          <h2>{t("sections.automated.title")}</h2>
          <p>{t("sections.automated.content")}</p>
        </>

        <>
          <h2>{t("sections.minors.title")}</h2>
          <p>{t("sections.minors.content")}</p>
        </>

        <>
          <h2>{t("sections.modifications.title")}</h2>
          <p>{t("sections.modifications.content")}</p>
        </>

        <>
          <h2>{t("sections.contact.title")}</h2>
          <p>
            {t("sections.contact.content")}
            <br />
            {t("sections.contact.email")}
            <br />
            {t("sections.contact.phone")}
            <br />
            {t("sections.contact.address")}
          </p>
        </>
      </div>
      </section>
    </main>
  );
}
