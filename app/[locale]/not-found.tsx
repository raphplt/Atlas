import { useTranslations } from "next-intl";
import { PageHero } from "@/components/atlas/PageHero";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main id="main-content">
      <PageHero title={t("title")} lead={t("text")}>
        <div className="actions">
          <Link href="/" className="btn btn-light">
            {t("back")}
          </Link>
          <Link href="/realisations" className="link">
            {t("work")}
          </Link>
        </div>
      </PageHero>
    </main>
  );
}
