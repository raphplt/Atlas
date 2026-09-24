// TODO(i18n) : contenu de la page encore en français.
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Label } from "@/components/studio/Shell";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/meta";
export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/about", page: "about" });
}
export default async function About({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <main id="main-content">
      <section className="about-section section-wrap">
        <div className="portrait-wrap">
          <Image
            src="/images/Raphael-Plassart.png"
            alt="Raphaël Plassart"
            width={560}
            height={640}
            priority
          />
          <span>RAPHAËL PLASSART / ATLAS</span>
        </div>
        <div>
          <Label>L’ATELIER INDÉPENDANT</Label>
          <h1 style={{ fontSize: "clamp(40px,5vw,64px)" }}>
            Un regard créatif.
            <br />
            <em>Une tête technique.</em>
          </h1>
          <p>
            Je suis Raphaël Plassart, développeur et créateur d’Atlas. J’aime
            donner une forme concrète aux idées : trouver la bonne composition,
            simplifier un parcours et construire un site agréable à utiliser.
          </p>
          <p>
            Mon expérience de développeur et de cofondateur de Melios et Quori
            nourrit une approche qui relie la technique aux besoins réels d’une
            activité. Le site est un outil de travail autant qu’une vitrine.
          </p>
          <p>
            Avec moi, vous avez un interlocuteur direct. Nous définissons
            ensemble le périmètre, les priorités et les étapes avant de
            commencer. Vous suivez l’avancement et participez aux choix qui
            comptent.
          </p>
          <Link className="button" href="/#contact">
            Faisons connaissance ↗
          </Link>
        </div>
      </section>
    </main>
  );
}
