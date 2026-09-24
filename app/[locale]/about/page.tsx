import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/atlas/ContactBand";
import { PageHero } from "@/components/atlas/PageHero";
import { Reveal } from "@/components/atlas/Reveal";
import type { Locale } from "@/i18n/routing";
import { portrait } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";
import { siteMeta } from "@/lib/site";

type Item = { title: string; text: string };

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/about", page: "about" });
}

export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  // Le portfolio existe en FR et EN (pas en IT) : les autres langues pointent vers l'anglais.
  const portfolioUrl = locale === "fr" ? siteMeta.portfolio : `${siteMeta.portfolio}/en`;

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")} />

      <section className="section" aria-labelledby="intro-title">
        <div className="wrap about">
          <Reveal className="portrait">
            <Image
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt={t("portraitAlt")}
              sizes="(max-width: 900px) 90vw, 40vw"
              priority
            />
          </Reveal>
          <Reveal>
            <h2 id="intro-title" className="h2">
              {t("introTitle")}
            </h2>
            <div className="stack">
              {(t.raw("intro") as string[]).map((p) => (
                <p key={p} className="body">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="values-title" className="h2">
              {t("values.title")}
            </h2>
          </Reveal>
          <Reveal>
            <ul className="points">
              {(t.raw("values.items") as Item[]).map((item) => (
                <li key={item.title}>
                  <h3 className="h3">{item.title}</h3>
                  <p className="body">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="products-title">
        <div className="wrap">
          <Reveal className="note">
            <div>
              <h2 id="products-title" className="h3">
                {t("products.title")}
              </h2>
              <p className="body">{t("products.text")}</p>
            </div>
            <a
              href={portfolioUrl}
              className="link link-out"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("products.link")}
            </a>
          </Reveal>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
