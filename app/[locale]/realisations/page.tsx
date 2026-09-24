import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactBand } from "@/components/atlas/ContactBand";
import { PageHero } from "@/components/atlas/PageHero";
import { Reveal } from "@/components/atlas/Reveal";
import { WorkCard } from "@/components/atlas/WorkCard";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";
import { getWork } from "@/lib/projects";

export async function generateMetadata({ params }: PageProps<"/[locale]/realisations">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/realisations", page: "work" });
}

export default async function Work({ params }: PageProps<"/[locale]/realisations">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const [t, work] = await Promise.all([
    getTranslations({ locale, namespace: "work" }),
    getWork(locale),
  ]);
  const groups = [
    { key: "clients", items: work.filter((w) => w.kind === "client"), intro: null },
    {
      key: "products",
      items: work.filter((w) => w.kind === "product"),
      intro: t("productsIntro"),
    },
  ] as const;

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")} />
      {groups.map(
        (g) =>
          g.items.length > 0 && (
            <section key={g.key} className="section" aria-labelledby={`${g.key}-title`}>
              <div className="wrap">
                <Reveal className="section-head">
                  <h2 id={`${g.key}-title`} className="h2">
                    {t(g.key)}
                  </h2>
                  {g.intro && <p className="body">{g.intro}</p>}
                </Reveal>
                <div className="cards">
                  {g.items.map((item) => (
                    <Reveal key={item.slug}>
                      <WorkCard item={item} locale={locale} />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          ),
      )}
      <ContactBand />
    </main>
  );
}
