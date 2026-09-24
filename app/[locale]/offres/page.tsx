import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/atlas/ContactBand";
import { PageHero } from "@/components/atlas/PageHero";
import { Path } from "@/components/atlas/Path";
import { Reveal } from "@/components/atlas/Reveal";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";

type Item = { title: string; text: string };

export async function generateMetadata({ params }: PageProps<"/[locale]/offres">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/offres", page: "offers" });
}

export default async function Offers({ params }: PageProps<"/[locale]/offres">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const [t, tMethod] = await Promise.all([
    getTranslations({ locale, namespace: "offers" }),
    getTranslations({ locale, namespace: "method" }),
  ]);
  const offers = [
    { key: "site", id: "site" },
    { key: "product", id: "produit" },
  ] as const;

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")}>
        <div className="actions">
          {offers.map((o) => (
            <a key={o.id} href={`#${o.id}`} className="btn btn-light">
              {t(`${o.key}.title`)}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap">
          {offers.map((o) => (
            <article key={o.id} id={o.id} className="offer">
              <Reveal>
                <p className="offer-for">{t(`${o.key}.for`)}</p>
                <h2 className="h2">{t(`${o.key}.title`)}</h2>
                <p className="lead">{t(`${o.key}.lead`)}</p>
                <div className="actions">
                  <Link href="/contact" className="btn">
                    {t("pricing.cta")}
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <ul className="offer-list">
                  {(t.raw(`${o.key}.items`) as Item[]).map((item) => (
                    <li key={item.title}>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="included-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="included-title" className="h2">
              {t("included.title")}
            </h2>
          </Reveal>
          <Reveal>
            <ul className="points">
              {(t.raw("included.items") as Item[]).map((item) => (
                <li key={item.title}>
                  <h3 className="h3">{item.title}</h3>
                  <p className="body">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="method-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="method-title" className="h2">
              {t("method.title")}
            </h2>
          </Reveal>
          <Path steps={tMethod.raw("steps")} />
        </div>
      </section>

      <section className="section" aria-labelledby="pricing-title">
        <div className="wrap">
          <Reveal className="note">
            <div>
              <h2 id="pricing-title" className="h3">
                {t("pricing.title")}
              </h2>
              <p className="body">{t("pricing.text")}</p>
            </div>
            <Link href="/faq" className="link link-arrow">
              {t("faq")}
            </Link>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
