// TODO(i18n) : contenu de la page encore en français.
import { setRequestLocale } from "next-intl/server";
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
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <main id="main-content" className="article-wrap">
      <p className="eyebrow">BIEN REÇU</p>
      <h1>Merci pour votre message.</h1>
      <p>Je reviens vers vous pour parler de votre projet.</p>
      <Link className="button" href="/">
        Retour à l’accueil ↗
      </Link>
    </main>
  );
}
