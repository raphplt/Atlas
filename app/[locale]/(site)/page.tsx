import Link from "next/link";
import Image from "next/image";
import { Art, Label } from "@/components/studio/Shell";
import { Contact } from "@/components/studio/Contact";
import { posts } from "@/content/journal";
export const metadata = { alternates: { canonical: "/" } };
export default function Page() {
  return (
    <main id="main-content">
      <section className="hero section-wrap">
        <div className="hero-top">
          <Label>ATELIER INDÉPENDANT · DESIGN & CODE</Label>
          <span className="hero-note">
            Raphaël Plassart
            <br />
            Développeur & designer freelance
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              Votre savoir-faire.
              <br />
              Un site à <em>sa hauteur.</em>
            </h1>
            <p>
              Je crée des sites qui ont du caractère.
              <br />
              Pensés pour vos clients, dessinés pour vous.
              <br />
              Et construits pour durer.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="button">
                Parlons de votre projet <span>↗</span>
              </Link>
              <Link href="#realisations" className="text-link">
                Explorer les réalisations <span>↓</span>
              </Link>
            </div>
          </div>
          <Art />
        </div>
        <div className="hero-bottom">
          <span>
            LE SENS DU DÉTAIL. DE LA PREMIÈRE IDÉE À LA DERNIÈRE LIGNE DE CODE.
          </span>
          <span>SCROLL POUR EXPLORER ↓</span>
        </div>
      </section>
      <div className="discipline-strip">
        <span>Design singulier</span>
        <b>✳</b>
        <span>Développement sur mesure</span>
        <b>✳</b>
        <span>Référencement naturel</span>
        <b>✳</b>
        <span>Relation directe</span>
      </div>
      <section id="realisations" className="section-wrap work-section">
        <div className="section-heading">
          <div>
            <Label>01 / DU CONCRET</Label>
            <h2>
              Le travail parle.
              <br />
              <em>Les clients aussi.</em>
            </h2>
          </div>
          <p>
            Chaque activité a son histoire.
            <br />
            Voici comment je l’aide à prendre sa place en ligne.
          </p>
        </div>
        <Link className="project-feature" href="/realisations/permapaysage">
          <div className="project-preview">
            <div className="project-browser">
              <div className="browser-bar">
                <span>● ● ●</span>
                <span>permapaysage.fr</span>
                <span>↗</span>
              </div>
              <div className="garden-preview">
                <div className="garden-brand">
                  permapaysage<span>ÉCO-PAYSAGISTE À VALLET</span>
                </div>
                <div className="garden-content">
                  <span>CONCEVOIR · AMÉNAGER · PRENDRE SOIN</span>
                  <h3>
                    Des jardins vivants.
                    <br />
                    <i>Naturellement.</i>
                  </h3>
                  <p>
                    Un autre regard sur votre jardin,
                    <br />
                    dans le Vignoble Nantais.
                  </p>
                  <span className="garden-button">Imaginer mon jardin ↗</span>
                </div>
                <div className="garden-illustration">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <span>
                    Le vivant
                    <br />
                    comme inspiration.
                  </span>
                </div>
              </div>
            </div>
            <span className="preview-caption">
              DIRECTION VISUELLE · APERÇU ÉDITORIAL DU PROJET
            </span>
          </div>
          <div className="project-info">
            <div>
              <h3>Permapaysage</h3>
              <p>Faire grandir une présence, comme on cultive un jardin.</p>
            </div>
            <div className="project-tags">
              <span>Refonte</span>
              <span>SEO local</span>
              <span className="circle-arrow">↗</span>
            </div>
          </div>
        </Link>
        <div className="testimonial">
          <span className="quote-mark">“</span>
          <blockquote>
            Il a su transformer un outil potable en une véritable machine de
            guerre digitale.
            <cite>
              PERMAPAYSAGE <span>— Éco-paysagiste à Vallet</span>
            </cite>
          </blockquote>
          <a
            className="text-link"
            href="https://www.linkedin.com/posts/permapaysage_permapaysage-%C3%A9co-paysagiste-%C3%A0-vallet-activity-7441431187446861824-4d9D"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lire le témoignage ↗
          </a>
        </div>
      </section>
      <section id="expertises" className="expertise-section section-wrap">
        <div className="section-heading">
          <div>
            <Label>02 / L’EXIGENCE, À CHAQUE ÉTAPE</Label>
            <h2>
              Beau, oui.
              <br />
              <em>Mais jamais seulement.</em>
            </h2>
          </div>
          <p>
            Un bon site doit vous ressembler.
            <br />
            Un excellent site doit aussi vous servir.
          </p>
        </div>
        <div className="services">
          {[
            {
              n: "01",
              title: "Une identité qui reste",
              text: "Une direction artistique pensée pour votre activité. Des choix de typographie, de couleurs et de composition qui vous rendent reconnaissable.",
              tags: "DIRECTION ARTISTIQUE / WEB DESIGN",
            },
            {
              n: "02",
              title: "Du code qui tient la route",
              text: "Un site fluide, accessible et agréable sur tous les écrans. Une base technique soignée, sans surcharger l’expérience de vos visiteurs.",
              tags: "DÉVELOPPEMENT / PERFORMANCE",
            },
            {
              n: "03",
              title: "Une présence qui compte",
              text: "Des pages structurées autour de vos services et des recherches de vos clients. Le référencement se construit dès les premières lignes.",
              tags: "SEO / STRATÉGIE DE CONTENU",
            },
          ].map((s) => (
            <div className="service" key={s.n}>
              <span className="service-number">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="service-tags">{s.tags}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section section-wrap">
        <div className="portrait-wrap">
          <Image
            src="/images/Raphael-Plassart.png"
            alt="Raphaël Plassart, créateur d’Atlas"
            width={560}
            height={640}
            sizes="(max-width: 700px) 90vw, 40vw"
          />
          <span>LE VISAGE DERRIÈRE ATLAS ↗</span>
        </div>
        <div>
          <Label>03 / UN FREELANCE, PAS UNE USINE</Label>
          <h2>
            La tête dans les idées.
            <br />
            <em>Les mains dans le code.</em>
          </h2>
          <p>
            Moi, c’est Raphaël. Je réunis design et développement pour faire le
            lien entre ce que vous imaginez et ce que vos clients vivent.
          </p>
          <p>
            Avec Atlas, vous échangez directement avec la personne qui conçoit
            et développe votre site. Du premier croquis à la mise en ligne, je
            garde le même fil : comprendre votre métier et lui donner la place
            qu’il mérite.
          </p>
          <Link href="/about" className="text-link">
            Faire connaissance ↗
          </Link>
        </div>
      </section>
      <section className="process-section section-wrap">
        <Label>04 / SIMPLE, DU DÉBUT À LA SUITE</Label>
        <div className="process-grid">
          {[
            [
              "On échange.",
              "Votre métier, vos clients, vos objectifs. On pose les bonnes questions avant de dessiner.",
            ],
            [
              "On donne forme.",
              "Une direction visuelle, des pages, des retours. Vous voyez votre site prendre vie.",
            ],
            [
              "On fait les choses bien.",
              "Développement, vérifications et mise en ligne. Puis les clés pour continuer sereinement.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>0{i + 1} —</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="journal-section section-wrap">
        <div className="section-heading">
          <div>
            <Label>05 / NOTES D’ATELIER</Label>
            <h2>
              Un peu de recul.
              <br />
              <em>Beaucoup de concret.</em>
            </h2>
          </div>
          <Link className="text-link" href="/blog">
            Tout le journal ↗
          </Link>
        </div>
        <div className="journal-grid">
          {posts.map((p, i) => (
            <Link
              href={`/blog/${p.slug}`}
              className="journal-card"
              key={p.slug}
            >
              <div
                className={`journal-art journal-art-${i}`}
                aria-hidden="true"
              >
                <span>{["Aa", "↗", "</>"][i]}</span>
                <small>ATLAS — NOTE 0{i + 1}</small>
              </div>
              <p className="eyebrow">
                {p.category} <span>· {p.readingTime} MIN DE LECTURE</span>
              </p>
              <h3>
                {p.title} <span>↗</span>
              </h3>
            </Link>
          ))}
        </div>
      </section>
      <Contact />
    </main>
  );
}
