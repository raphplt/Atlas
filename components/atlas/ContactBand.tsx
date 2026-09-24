import { useTranslations } from "next-intl";
import { siteMeta } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { ContourField } from "./ContourField";

/** Dernière section de l'accueil et des pages de service. */
export function ContactBand({ id = "contact" }: { id?: string }) {
  const t = useTranslations("contactBand");
  return (
    <section id={id} className="band band-ink contact">
      <ContourField className="band-field" levels={12} />
      <div className="wrap contact-grid">
        <div>
          <h2 className="h1">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="lead">{t("text")}</p>
          <a href={`mailto:${siteMeta.email}`} className="mail">
            {siteMeta.email}
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
