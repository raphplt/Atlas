import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <main id="main-content" className="article-wrap">
      <p className="eyebrow">{t("eyebrow")}</p>
      <h1>
        {t("titleLine1")}
        <br />
        <em>{t("titleLine2")}</em>
      </h1>
      <p>{t("text")}</p>
      <Link className="button" href="/">
        {t("back")} ↗
      </Link>
    </main>
  );
}
