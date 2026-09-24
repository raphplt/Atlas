import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { WorkItem } from "@/lib/projects";

/** Carte d'une réalisation : étude de cas interne ou produit en ligne. */
export async function WorkCard({ item, locale }: { item: WorkItem; locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "work" });
  const content = (
    <>
      {item.image && (
        <div className="shot shot-crop">
          <Image
            src={item.image.src}
            width={item.image.width}
            height={item.image.height}
            alt={item.image.alt}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      )}
      <div className="card-meta">
        <h3 className="h3">{item.title}</h3>
        {item.fact && <span>{item.fact}</span>}
      </div>
      {item.summary && <p className="body">{item.summary}</p>}
      {item.hasPage ? (
        <span className="link link-arrow">{t("readCase")}</span>
      ) : (
        item.url && <span className="link link-out">{t("visit")}</span>
      )}
    </>
  );
  if (item.hasPage)
    return (
      <Link href={`/realisations/${item.slug}`} className="card">
        {content}
      </Link>
    );
  if (item.url)
    return (
      <a href={item.url} className="card" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  return <div className="card">{content}</div>;
}
