// TODO(i18n) : contenu de la page encore en français.
import { Link } from "@/i18n/navigation";
import { faqSchema, jsonLd } from "@/lib/schema";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";
const questions = [
  {
    question: "Combien coûte un site sur mesure ?",
    answer:
      "Le prix dépend du nombre de pages, des contenus et des fonctionnalités. Après un premier échange, vous recevez un devis qui précise le périmètre et les étapes. Aucun tarif unique ne remplace cette discussion.",
  },
  {
    question: "Pouvez-vous refaire mon site existant ?",
    answer:
      "Oui. Nous commençons par identifier ce qui fonctionne et ce qui doit évoluer : identité visuelle, contenus, navigation ou technique. Les changements d’adresses sont préparés pour conserver des parcours cohérents.",
  },
  {
    question: "Comment se déroule le projet ?",
    answer:
      "Nous clarifions vos objectifs, puis je propose une direction visuelle. Après vos retours, je développe les pages, vérifie les parcours et prépare la mise en ligne avec vous.",
  },
  {
    question: "Le référencement est-il pris en compte ?",
    answer:
      "Oui : structure des pages, titres, descriptions, liens internes et performance font partie de la conception. Un classement dans Google ne peut toutefois pas être garanti.",
  },
  {
    question: "Est-ce que je pourrai publier des articles ?",
    answer:
      "Oui. Le mode de publication se choisit en fonction de vos besoins. Un espace d’administration peut être prévu au devis si vous souhaitez rédiger et publier en autonomie.",
  },
  {
    question: "Qui s’occupe du site après la livraison ?",
    answer:
      "Les modalités d’hébergement, de maintenance et d’accompagnement sont définies dans le devis. Nous prévoyons les accès et les explications nécessaires à la continuité de votre site.",
  },
];
export async function generateMetadata({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/faq", page: "faq" });
}
export default async function FAQ({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <main id="main-content" className="article-wrap">
      <p className="eyebrow">AVANT DE SE LANCER</p>
      <h1>Les bonnes questions.</h1>
      {questions.map((q) => (
        <details className="faq-item" key={q.question}>
          <summary>
            {q.question}
            <span>＋</span>
          </summary>
          <p>{q.answer}</p>
        </details>
      ))}
      <Link className="button" href="/#contact">
        Parlons de votre projet ↗
      </Link>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(faqSchema(questions))}
      />
    </main>
  );
}
