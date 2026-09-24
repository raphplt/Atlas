import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/atlas/ContactBand";
import { ContourField } from "@/components/atlas/ContourField";
import { OfferIcon } from "@/components/atlas/OfferIcon";
import { PageSpeed } from "@/components/atlas/PageSpeed";
import { Path } from "@/components/atlas/Path";
import { PostCards } from "@/components/atlas/PostCards";
import { Reveal } from "@/components/atlas/Reveal";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPosts } from "@/lib/blog";
import { permapaysage, portrait, quoted } from "@/lib/content";
import { pageMetadata } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/" });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const [t, tFaq, tMethod, posts] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "faq" }),
    getTranslations({ locale, namespace: "method" }),
    getPosts(locale, 3),
  ]);
  const doors = [
    { key: "site", href: "/offres#site" },
    { key: "product", href: "/offres#produit" },
  ] as const;
  // Prix, refonte, référencement, suivi : la démarche est déjà couverte par « method ».
  const questions = (tFaq.raw("items") as { question: string; answer: string }[]).filter(
    (_, i) => [0, 1, 3, 6].includes(i),
  );

  return (
    <main id="main-content">
      <section className="band hero">
        <ContourField className="band-field" />
        <div className="wrap hero-body">
          <h1 className="display">
            {t("hero.title1")}
            <br />
            {t("hero.title2")}
          </h1>
          <div className="hero-aside">
            <p className="lead">{t("hero.lead")}</p>
            <div className="actions">
              <Link href="/contact" className="btn btn-light">
                {t("hero.cta")}
              </Link>
              <Link href="/realisations" className="link">
                {t("hero.secondary")}
              </Link>
            </div>
          </div>
        </div>
        <div className="wrap">
          <PageSpeed className="speed" />
        </div>
      </section>

      <section className="section case" aria-labelledby="case-title">
        <div className="wrap">
          <Reveal className="case-head">
            <h2 id="case-title" className="h2">
              {t("case.title")}
            </h2>
            <p className="body">{t("case.who")}</p>
          </Reveal>
          <Reveal className="shot">
            <Image
              src={permapaysage.image.src}
              width={permapaysage.image.width}
              height={permapaysage.image.height}
              alt={t("case.imageAlt")}
              sizes="(max-width: 1480px) 100vw, 1400px"
            />
          </Reveal>
          <div className="case-grid">
            <Reveal>
              <h3 className="h3">{t("case.beforeTitle")}</h3>
              <p className="body">{t("case.before")}</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h3 className="h3">{t("case.didTitle")}</h3>
              <p className="body">{t("case.did")}</p>
            </Reveal>
            <Reveal delay={0.12} className="quote">
              <blockquote>{quoted(t("case.quote"), locale)}</blockquote>
              <p>{t("case.quoteBy")}</p>
              <div className="actions">
                <Link href="/realisations/permapaysage" className="link link-arrow">
                  {t("case.readCase")}
                </Link>
                <a
                  href={permapaysage.url}
                  className="link link-out"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("case.visit")}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="doors-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="doors-title" className="h2">
              {t("doors.title")}
            </h2>
          </Reveal>
          <div className="doors">
            {doors.map((d) => (
              <Reveal key={d.key} className="door">
                <ContourField
                  className="door-field"
                  color="31,59,217"
                  levels={9}
                  cell={16}
                  scale={0.004}
                  interactive={false}
                />
                <OfferIcon kind={d.key} className="door-icon" />
                <p className="door-for">{t(`doors.${d.key}.for`)}</p>
                <h3 className="door-title">{t(`doors.${d.key}.title`)}</h3>
                <p className="body">{t(`doors.${d.key}.text`)}</p>
                <ul className="chips">
                  {(t.raw(`doors.${d.key}.items`) as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={d.href} className="link link-arrow">
                  {t("doors.more")}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="method-title">
        <div className="wrap">
          <Reveal className="section-head">
            <h2 id="method-title" className="h2">
              {t("method.title")}
            </h2>
            <p className="body">{t("method.intro")}</p>
          </Reveal>
          <Path steps={tMethod.raw("steps")} />
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <div className="wrap about">
          <Reveal className="portrait">
            <Image
              src={portrait.src}
              width={portrait.width}
              height={portrait.height}
              alt={t("about.portraitAlt")}
              sizes="(max-width: 900px) 90vw, 40vw"
            />
          </Reveal>
          <Reveal>
            <h2 id="about-title" className="h2">
              {t("about.title")}
            </h2>
            <div className="stack">
              <p className="body">{t("about.p1")}</p>
              <p className="body">{t("about.p2")}</p>
            </div>
            <div className="actions">
              <Link href="/about" className="link link-arrow">
                {t("about.more")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" aria-labelledby="journal-title">
          <div className="wrap">
            <Reveal className="section-head">
              <div>
                <h2 id="journal-title" className="h2">
                  {t("journal.title")}
                </h2>
                <p className="body">
                  {t("journal.intro")}
                </p>
              </div>
              <Link href="/blog" className="link link-arrow">
                {t("journal.all")}
              </Link>
            </Reveal>
            <PostCards posts={posts} locale={locale} />
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="faq-title">
        <div className="wrap">
          <Reveal className="section-head">
            <div>
              <h2 id="faq-title" className="h2">
                {tFaq("hero.title")}
              </h2>
              <p className="body">{tFaq("hero.lead")}</p>
            </div>
            <Link href="/faq" className="link link-arrow">
              {t("faq.all")}
            </Link>
          </Reveal>
          <div className="faq">
            {questions.map((q) => (
              <details key={q.question}>
                <summary>{q.question}</summary>
                <p>{q.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
