import Image from "next/image";
import { Instrument_Sans, Young_Serif } from "next/font/google";
import { Poincon, SketchToSite, Underline } from "@/components/lab/atelier/parts";
import { PageSpeed } from "@/components/lab/PageSpeed";
import { Reveal } from "@/components/lab/Reveal";
import { EMAIL, doors, permapaysage, products } from "@/components/lab/content";
import s from "@/components/lab/atelier/atelier.module.css";

const serif = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--a-display" });
const sans = Instrument_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--a-text" });

export const metadata = { title: "Atelier — piste C" };

export default function Atelier() {
  return (
    <div className={`${s.root} ${serif.variable} ${sans.variable}`}>
      <header className={s.nav}>
        <a href="#" className={s.brand} aria-label="Atlas">
          <Poincon size={46} className={s.navMark} />
          <span>Atlas</span>
        </a>
        <nav>
          <a href="#travaux">Réalisations</a>
          <a href="#offres">Offres</a>
          <a href="#">Journal</a>
          <a href="#">L’atelier</a>
        </nav>
        <a href="#contact" className={s.btnSun}>
          Parlons de votre projet
        </a>
      </header>

      <section className={s.hero}>
        <h1 className={s.h1}>
          Du croquis au site qui vous amène des{" "}
          <Underline className={s.underline}>clients.</Underline>
        </h1>
        <div className={s.heroAside}>
          <p className={s.lead}>
            Je dessine et je développe votre site à la main, sans modèle tout
            fait. Pour les artisans, les TPE et les indépendants qui veulent un
            outil à leur image, et qui travaille pour eux.
          </p>
          <div className={s.actions}>
            <a href="#contact" className={s.btnInk}>
              Parlons de votre projet
            </a>
            <a href="#travaux" className={s.link}>
              Voir les réalisations
            </a>
          </div>
        </div>
      </section>

      <SketchToSite
        src={permapaysage.image}
        alt="Le site Permapaysage, du croquis à la version en ligne"
        className={s.sketchWrap}
        frameClassName={s.sketchFrame}
        penClassName={s.pen}
      />

      <section id="travaux" className={s.case}>
        <div className={s.caseInner}>
          <Reveal className={s.caseHead}>
            <h2 className={s.h2}>Permapaysage, éco-paysagiste à Vallet.</h2>
            <p>{permapaysage.what}</p>
          </Reveal>
          <div className={s.caseGrid}>
            <Reveal>
              <h3 className={s.h3}>Avant</h3>
              <p>{permapaysage.before}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className={s.h3}>Après</h3>
              <p>{permapaysage.did}</p>
            </Reveal>
          </div>
          <Reveal className={s.quote}>
            <blockquote>« {permapaysage.quote} »</blockquote>
            <p>{permapaysage.quoteBy}</p>
          </Reveal>
        </div>
      </section>

      <section id="offres" className={s.doors}>
        <Reveal>
          <h2 className={s.h2}>Deux établis, le même soin.</h2>
        </Reveal>
        <div className={s.doorGrid}>
          {doors.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.1} className={s.door}>
              <p className={s.doorFor}>{d.for}</p>
              <h3 className={s.doorTitle}>{d.title}</h3>
              <p>{d.text}</p>
              <ul>
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={s.products}>
        <Reveal>
          <h2 className={s.h2}>Et quand je ne travaille pas pour un client, je fabrique mes propres outils.</h2>
        </Reveal>
        <div className={s.productGrid}>
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1} className={s.product}>
              <div className={s.productShot}>
                <Image src={p.image} alt={p.name} width={p.w} height={p.h} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <h3 className={s.h3}>{p.name}</h3>
              <p>{p.line}</p>
              <p className={s.fact}>{p.fact}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" className={s.contact}>
        <Poincon size={220} spin className={s.contactMark} />
        <h2 className={s.h1}>On en parle autour d’un café ?</h2>
        <a href={`mailto:${EMAIL}`} className={s.mail}>
          {EMAIL}
        </a>
        <PageSpeed className={s.speed} after="Vos clients aussi apprécieront." />
      </section>

      <section className={s.sheet}>
        <h2 className={s.sheetTitle}>Planche d’identité — Atelier</h2>
        <div className={s.sheetGrid}>
          <div className={`${s.tile} ${s.tileGreen}`}>
            <Poincon size={170} />
          </div>
          <div className={s.tile}>
            <div className={s.lockup}>
              <Poincon size={72} className={s.navMark} />
              <span>Atlas</span>
            </div>
          </div>
          <div className={`${s.tile} ${s.tileSun}`}>
            <span className={s.bigA}>Aa</span>
          </div>
          <div className={s.swatches}>
            {[
              ["Sapin", "#16382C", "#fff"],
              ["Soleil", "#FFC53D", "#16382C"],
              ["Blanc", "#FFFFFF", "#16382C"],
              ["Argile", "#E7DCCB", "#16382C"],
              ["Encre", "#141414", "#fff"],
            ].map(([n, c, f]) => (
              <div key={n} style={{ background: c, color: f }}>
                <strong>{n}</strong>
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div className={s.specimen}>
            <p>
              <strong>Young Serif</strong> pour les titres : une serif droite,
              ronde et généreuse, qui sent l’ouvrage bien fait sans faire vieux.
              <strong> Instrument Sans</strong> pour le texte.
              <br />
              <strong>Le poinçon.</strong> Comme l’artisan frappe sa marque sur
              son ouvrage, chaque site Atlas porte le sien.
              <br />
              <strong>Le trait.</strong> Des croquis, des soulignements au
              feutre : la main est visible, le process aussi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
