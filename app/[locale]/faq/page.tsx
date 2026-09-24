import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/atlas/PageHero";
import { Reveal } from "@/components/atlas/Reveal";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";
import { faqSchema, jsonLd } from "@/lib/schema";

type Question = { question: string; answer: string };

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/faq", page: "faq" });
}

export default async function FAQ({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  const questions = t.raw("items") as Question[];

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")} />
      <section className="section">
        <div className="wrap">
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
      <section className="section">
        <div className="wrap">
          <Reveal className="note">
            <div>
              <h2 className="h3">{t("moreTitle")}</h2>
              <p className="body">{t("moreText")}</p>
            </div>
            <Link href="/contact" className="btn">
              {t("cta")}
            </Link>
          </Reveal>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(questions))}
      />
    </main>
  );
}
