import Image from "next/image";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { ContourField } from "@/components/lab/ContourField";
import { PageSpeed } from "@/components/lab/PageSpeed";
import { ReliefMark } from "@/components/lab/relief/Mark";
import { Reveal } from "@/components/lab/Reveal";
import { EMAIL, doors, permapaysage, products } from "@/components/lab/content";
import s from "@/components/lab/relief/relief.module.css";

const display = Funnel_Display({ subsets: ["latin"], variable: "--r-display" });
const text = Funnel_Sans({ subsets: ["latin"], variable: "--r-text" });

export const metadata = { title: "Relief — piste A" };

export default function Relief() {
  return (
    <div className={`${s.root} ${display.variable} ${text.variable}`}>
      <section className={s.hero}>
        <ContourField className={s.field} />
        <header className={s.nav}>
          <a href="#" className={s.brand} aria-label="Atlas">
            <ReliefMark size={34} stroke={8} />
            <span>atlas</span>
          </a>
          <nav>
            <a href="#travaux">Réalisations</a>
            <a href="#offres">Offres</a>
            <a href="#">Journal</a>
            <a href="#">À propos</a>
          </nav>
          <a href="#contact" className={s.navCta}>
            Démarrer un projet
          </a>
        </header>

        <div className={s.heroBody}>
          <h1 className={s.h1}>
            Mettez votre activité
            <br />
            sur la carte.
          </h1>
          <div className={s.heroAside}>
            <p className={s.lead}>
              Je conçois et développe des sites rapides, singuliers et bien
              référencés, pour les artisans, les indépendants et les entreprises
              qui veulent être trouvés.
            </p>
            <div className={s.actions}>
              <a href="#contact" className={s.btnLight}>
                Démarrer un projet
              </a>
              <a href="#travaux" className={s.linkLight}>
                Voir les réalisations
              </a>
            </div>
          </div>
        </div>
        <PageSpeed className={s.speed} />
      </section>

      <section id="travaux" className={s.case}>
        <Reveal className={s.caseHead}>
          <h2 className={s.h2}>
            Permapaysage a quitté Odoo pour un site à sa mesure.
          </h2>
          <p className={s.body}>{permapaysage.who}.</p>
        </Reveal>

        <Reveal className={s.shot}>
          <Image
            src={permapaysage.image}
            alt="Page d’accueil du site Permapaysage"
            width={1600}
            height={920}
            sizes="(max-width: 900px) 100vw, 1200px"
          />
        </Reveal>

        <div className={s.caseGrid}>
          <Reveal>
            <h3 className={s.h3}>Le point de départ</h3>
            <p className={s.body}>{permapaysage.before}</p>
          </Reveal>
          <Reveal>
            <h3 className={s.h3}>Ce qu’on a construit</h3>
            <p className={s.body}>{permapaysage.did}</p>
          </Reveal>
          <Reveal className={s.quote}>
            <blockquote>« {permapaysage.quote} »</blockquote>
            <p className={s.body}>{permapaysage.quoteBy}</p>
          </Reveal>
        </div>
      </section>

      <section id="offres" className={s.doors}>
        <Reveal>
          <h2 className={s.h2}>Deux façons de travailler ensemble.</h2>
        </Reveal>
        <div className={s.doorGrid}>
          {doors.map((d) => (
            <Reveal key={d.title} className={s.door}>
              <ContourField
                className={s.doorField}
                color="31,59,217"
                levels={9}
                cell={16}
                scale={0.004}
                interactive={false}
              />
              <p className={s.doorFor}>{d.for}</p>
              <h3 className={s.doorTitle}>{d.title}</h3>
              <p className={s.body}>{d.text}</p>
              <ul>
                {d.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={s.products}>
        <Reveal>
          <h2 className={s.h2}>Ce que je construis, aussi pour moi.</h2>
        </Reveal>
        <div className={s.productGrid}>
          {products.map((p) => (
            <Reveal key={p.name} className={s.product}>
              <div className={s.productShot}>
                <Image src={p.image} alt={p.name} width={p.w} height={p.h} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div className={s.productMeta}>
                <h3 className={s.h3}>{p.name}</h3>
                <span>{p.fact}</span>
              </div>
              <p className={s.body}>{p.line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className={s.contact}>
        <ContourField className={s.field} levels={12} />
        <h2 className={s.h1}>
          Un projet en tête ?
          <br />
          Traçons la route.
        </h2>
        <a href={`mailto:${EMAIL}`} className={s.mail}>
          {EMAIL}
        </a>
      </section>

      <section className={s.sheet}>
        <h2 className={s.sheetTitle}>Planche d’identité — Relief</h2>
        <div className={s.sheetGrid}>
          <div className={`${s.tile} ${s.tileBlue}`}>
            <ReliefMark size={120} stroke={6} />
          </div>
          <div className={s.tile}>
            <div className={s.lockup}>
              <ReliefMark size={64} stroke={8} />
              <span>atlas</span>
            </div>
          </div>
          <div className={`${s.tile} ${s.tileInk}`}>
            <div className={s.lockup}>
              <ReliefMark size={64} stroke={8} />
              <span>atlas</span>
            </div>
          </div>
          <div className={s.swatches}>
            {[
              ["Bleu carte", "#1F3BD9", "#fff"],
              ["Encre", "#0D1222", "#fff"],
              ["Papier", "#F3F4F1", "#0D1222"],
              ["Balise", "#FFD84D", "#0D1222"],
            ].map(([n, c, f]) => (
              <div key={n} style={{ background: c, color: f }}>
                <strong>{n}</strong>
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div className={s.specimen}>
            <span className={s.specDisplay}>Aa</span>
            <p>
              <strong>Funnel Display</strong> pour les titres : des terminaisons
              évasées, une présence nette sans être bavarde.
              <br />
              <strong>Funnel Sans</strong> pour le texte : même famille, lecture
              calme.
            </p>
          </div>
          <div className={s.specimen}>
            <p>
              <strong>Le motif.</strong> Une seule figure graphique : les courbes
              de niveau. Elles vivent, réagissent au curseur, et dessinent le
              relief de chaque projet. Jamais d’annotations, jamais de légendes.
              <br />
              <strong>La voix.</strong> Directe, concrète, orientée terrain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
