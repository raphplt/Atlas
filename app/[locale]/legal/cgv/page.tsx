import { PageHero } from "@/components/atlas/PageHero";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/cgv">) {
  const { locale } = await params;
  return pageMetadata({
    locale: locale as Locale,
    path: "/legal/cgv",
    page: "legalCgv",
  });
}

export default async function CGV({ params }: PageProps<"/[locale]/legal/cgv">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale: locale as Locale, namespace: "legal.cgv" });

  return (
    <main id="main-content" className="legal">
      <PageHero title={t("title")}>
        <p className="legal-date">{t("lastUpdate")}</p>
      </PageHero>
      <section className="section">
        <div className="wrap prose">
        <>
          <h2>{t("sections.object.title")}</h2>
          <p>{t("sections.object.content")}</p>
        </>

        <>
          <h2>{t("sections.provider.title")}</h2>
          <p>
            <strong>{t("sections.provider.name")}</strong>
            <br />
            {t("sections.provider.tradeName")}
            <br />
            {t("sections.provider.status")}
            <br />
            {t("sections.provider.siren")}
            <br />
            {t("sections.provider.siret")}
            <br />
            {t("sections.provider.ape")}
            <br />
            {t("sections.provider.address")}
            <br />
            {t("sections.provider.email")}
            <br />
            {t("sections.provider.phone")}
            <br />
            <em>{t("sections.provider.tva")}</em>
          </p>
        </>

        <>
          <h2>{t("sections.services.title")}</h2>
          <p>{t("sections.services.content")}</p>
          <ul>
            {t
              .raw("sections.services.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>
            <em>{t("sections.services.detail")}</em>
          </p>
        </>

        <>
          <h2>{t("sections.quote.title")}</h2>
          <ul>
            {t
              .raw("sections.quote.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.pricing.title")}</h2>
          <p>{t("sections.pricing.content")}</p>
        </>

        <>
          <h2>{t("sections.payment.title")}</h2>
          <p>{t("sections.payment.content")}</p>
          <ul>
            {t
              .raw("sections.payment.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>
            <em>{t("sections.payment.invoice")}</em>
          </p>
        </>

        <>
          <h2>{t("sections.latePayment.title")}</h2>
          <p>{t("sections.latePayment.content")}</p>
        </>

        <>
          <h2>{t("sections.delivery.title")}</h2>
          <p>{t("sections.delivery.content")}</p>
        </>

        <>
          <h2>{t("sections.providerObligations.title")}</h2>
          <ul>
            {t
              .raw("sections.providerObligations.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.clientObligations.title")}</h2>
          <ul>
            {t
              .raw("sections.clientObligations.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.withdrawal.title")}</h2>
          <p>{t("sections.withdrawal.content")}</p>
          <p>
            <em>{t("sections.withdrawal.exception")}</em>
          </p>
        </>

        <>
          <h2>{t("sections.validation.title")}</h2>
          <p>{t("sections.validation.content")}</p>
        </>

        <>
          <h2>{t("sections.revisions.title")}</h2>
          <p>{t("sections.revisions.content")}</p>
        </>

        <>
          <h2>{t("sections.guarantee.title")}</h2>
          <p>{t("sections.guarantee.content")}</p>
        </>

        <>
          <h2>{t("sections.intellectual.title")}</h2>
          <ul>
            {t
              .raw("sections.intellectual.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.liability.title")}</h2>
          <ul>
            {t
              .raw("sections.liability.items")
              .map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </>

        <>
          <h2>{t("sections.data.title")}</h2>
          <p>{t("sections.data.content")}</p>
        </>

        <>
          <h2>{t("sections.confidentiality.title")}</h2>
          <p>{t("sections.confidentiality.content")}</p>
        </>

        <>
          <h2>{t("sections.forceMajeure.title")}</h2>
          <p>{t("sections.forceMajeure.content")}</p>
        </>

        <>
          <h2>{t("sections.termination.title")}</h2>
          <p>{t("sections.termination.content")}</p>
        </>

        <>
          <h2>{t("sections.mediation.title")}</h2>
          <p>{t("sections.mediation.content")}</p>
        </>

        <>
          <h2>{t("sections.law.title")}</h2>
          <p>{t("sections.law.content")}</p>
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
