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
  // Seules les missions clients sont présentées ici, pas les produits perso.
  const clients = work.filter((w) => w.kind === "client");

  return (
    <main id="main-content">
      <PageHero title={t("hero.title")} lead={t("hero.lead")} />
      <section className="section">
        <div className="wrap">
          <div className="cards">
            {clients.map((item) => (
              <Reveal key={item.slug}>
                <WorkCard item={item} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
