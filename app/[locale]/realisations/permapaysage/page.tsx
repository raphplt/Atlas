// TODO(i18n) : contenu de la page encore en français.
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";
export async function generateMetadata({ params }: PageProps<"/[locale]/realisations/permapaysage">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/realisations/permapaysage", page: "permapaysage" });
}
export default async function Project({ params }: PageProps<"/[locale]/realisations/permapaysage">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <main id="main-content" className="article-wrap">
      <Link className="article-back" href="/#realisations">
        ← Les réalisations
      </Link>
      <p className="eyebrow" style={{ marginTop: 40 }}>
        ÉTUDE DE CAS / REfonte & visibilité locale
      </p>
      <h1>
        Permapaysage.
        <br />
        <em>Une présence qui prend racine.</em>
      </h1>
      <p className="article-lead">
        Un éco-paysagiste à Vallet. Un savoir-faire sur le terrain. Un site
        repensé pour mieux le rendre visible.
      </p>
      <a
        className="text-link"
        href="https://www.permapaysage.fr/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Découvrir le site en ligne ↗
      </a>
      <h2>Le point de départ</h2>
      <p>
        Permapaysage souhaitait un site à la hauteur de ses chantiers : clair,
        rapide et ancré dans son territoire, le Vignoble Nantais. Son retour
        d’expérience évoque les limites rencontrées avec ses précédents outils
        et son besoin de mieux présenter son expertise.
      </p>
      <h2>Une offre plus facile à comprendre</h2>
      <p>
        Le site distingue la conception, l’aménagement et l’entretien. Les
        réalisations illustrent les prestations, la zone d’intervention est
        explicite et les visiteurs accèdent directement à une demande d’étude.
        Les informations sur les avantages fiscaux liés à l’entretien disposent
        également d’un point d’entrée dédié.
      </p>
      <h2>Le territoire au cœur des contenus</h2>
      <p>
        Les services, les communes desservies et les réalisations locales
        donnent un contexte précis à l’activité. Un blog apporte des conseils
        sur le jardinage et la permaculture. Cette organisation vise à aider les
        visiteurs et les moteurs de recherche à comprendre l’offre.
      </p>
      <h2>Le retour du client</h2>
      <blockquote>
        « Il a su transformer un outil potable en une véritable machine de
        guerre digitale. »
      </blockquote>
      <p>— Permapaysage, à propos du travail de Raphaël Plassart.</p>
      <a
        className="text-link"
        href="https://www.linkedin.com/posts/permapaysage_permapaysage-%C3%A9co-paysagiste-%C3%A0-vallet-activity-7441431187446861824-4d9D"
        target="_blank"
        rel="noopener noreferrer"
      >
        Lire la publication d’origine ↗
      </a>
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 30 }}>
        Ce retour porte sur l’expérience du client. Aucun gain chiffré de
        trafic, de positionnement ou de chiffre d’affaires n’est annoncé ici
        sans mesure documentée.
      </p>
      <Link className="button" href="/#contact">
        Et si on repensait votre site ? ↗
      </Link>
    </main>
  );
}
