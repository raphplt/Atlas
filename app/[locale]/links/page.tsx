// TODO(i18n) : contenu de la page encore en français.
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { localizedPath, pageMetadata, siteMeta } from "@/lib/meta";
export async function generateMetadata({ params }: PageProps<"/[locale]/links">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/links", page: "links" });
}
export default async function Links({ params }: PageProps<"/[locale]/links">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <main id="main-content" className="article-wrap">
      <p className="eyebrow">RESTONS EN LIEN</p>
      <h1>
        Raphaël Plassart.
        <br />
        <em>Les bonnes adresses.</em>
      </h1>
      {[
        ["Atlas — Design & développement web", localizedPath("/", locale as Locale)],
        ["Me contacter", `mailto:${siteMeta.email}`],
        ["LinkedIn", siteMeta.linkedin],
        ["GitHub", siteMeta.github],
        ["Soutenir mon travail", "https://ko-fi.com/raphplt"],
      ].map(([title, url]) => (
        <p key={url}>
          <Link className="text-link" href={url}>
            {title} ↗
          </Link>
        </p>
      ))}
    </main>
  );
}
