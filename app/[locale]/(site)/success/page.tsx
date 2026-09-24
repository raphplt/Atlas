import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/atlas/PageHero";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps<"/[locale]/success">) {
  const { locale } = await params;
  return pageMetadata({
    locale: locale as Locale,
    path: "/success",
    page: "success",
    noindex: true,
  });
}

export default async function Success({ params }: PageProps<"/[locale]/success">) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "success" });
  return (
    <main id="main-content">
      <PageHero title={t("title")} lead={t("text")}>
        <Link href="/" className="btn btn-light">
          {t("back")}
        </Link>
      </PageHero>
    </main>
  );
}
