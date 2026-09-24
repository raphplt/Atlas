import Image from "next/image";
import { Mona_Sans } from "next/font/google";
import {
  BigSpeed,
  NocturneMark,
  ScrollStretch,
  StackCard,
  StretchTitle,
} from "@/components/lab/nocturne/parts";
import { Reveal } from "@/components/lab/Reveal";
import { EMAIL, doors, permapaysage, products } from "@/components/lab/content";
import s from "@/components/lab/nocturne/nocturne.module.css";

const mona = Mona_Sans({ subsets: ["latin"], axes: ["wdth"], variable: "--n-font" });

export const metadata = { title: "Nocturne — piste B" };

const work = [
  {
    name: permapaysage.name,
    what: permapaysage.what,
    who: permapaysage.who,
    image: permapaysage.image,
    w: 1600,
    h: 920,
    quote: permapaysage.quote,
    year: permapaysage.year,
  },
  ...products.map((p) => ({
    name: p.name,
    what: p.kind,
    who: p.line,
    image: p.image,
    w: p.w,
    h: p.h,
    quote: undefined as string | undefined,
    year: "2025",
  })),
];

const strip = [permapaysage.image, products[0].image, products[1].image];

export default function Nocturne() {
  return (
    <div className={`${s.root} ${mona.variable}`}>
      <header className={s.nav}>
        <a href="#" className={s.brand} aria-label="Atlas">
          <NocturneMark size={26} />
          <span>ATLAS</span>
        </a>
        <nav>
          <a href="#travaux">Travaux</a>
          <a href="#offres">Offres</a>
          <a href="#">Journal</a>
          <a href="#">Atelier</a>
        </nav>
        <a href="#contact" className={s.navCta}>
          Parlons-en
        </a>
      </header>

      <section className={s.hero}>
        <p className={s.intro}>
          Raphaël Plassart, designer et développeur. Sites sur mesure pour les
          artisans et les TPE, produits web pour ceux qui voient plus grand.
        </p>
        <StretchTitle
          className={s.h1}
          lines={["Votre métier", "mérite mieux", "qu’un template."]}
        />
        <div className={s.heroFoot}>
          <a href="#contact" className={s.btn}>
            Démarrer un projet
          </a>
          <a href="#travaux" className={s.link}>
            Voir les travaux
          </a>
        </div>
      </section>

      <div className={s.strip} aria-hidden="true">
        <div className={s.stripTrack}>
          {[...strip, ...strip, ...strip, ...strip].map((src, i) => (
            <Image key={i} src={src} alt="" width={640} height={380} sizes="480px" />
          ))}
        </div>
      </div>

      <section id="travaux" className={s.work}>
        <ScrollStretch className={s.h2}>Travaux choisis</ScrollStretch>
        <div className={s.stack}>
          {work.map((p, i) => (
            <StackCard key={p.name} index={i} className={s.card} wrapClassName={s.cardWrap}>
              <div className={s.cardShot}>
                <Image src={p.image} alt={`Aperçu de ${p.name}`} width={p.w} height={p.h} sizes="(max-width: 900px) 100vw, 65vw" />
              </div>
              <div className={s.cardInfo}>
                <div>
                  <h3 className={s.cardTitle}>{p.name}</h3>
                  <p>{p.what}</p>
                </div>
                <p className={s.cardWho}>{p.who}</p>
                {p.quote && <blockquote>« {p.quote} »</blockquote>}
                <span className={s.year}>{p.year}</span>
              </div>
            </StackCard>
          ))}
        </div>
      </section>

      <section className={s.speedWrap}>
        <BigSpeed className={s.speed} />
      </section>

      <section id="offres" className={s.doors}>
        {doors.map((d) => (
          <details key={d.title} className={s.door} open>
            <summary>
              <ScrollStretch as="h3" className={s.doorTitle}>
                {d.title}.
              </ScrollStretch>
              <span>{d.for}</span>
            </summary>
            <div className={s.doorBody}>
              <p>{d.text}</p>
              <ul>
                {d.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </section>

      <section id="contact" className={s.contact}>
        <Reveal>
          <p className={s.intro}>Un projet, une idée, une question ?</p>
          <a href={`mailto:${EMAIL}`} className={s.mail}>
            {EMAIL}
          </a>
        </Reveal>
      </section>

      <section className={s.sheet}>
        <h2 className={s.sheetTitle}>Planche d’identité — Nocturne</h2>
        <div className={s.sheetGrid}>
          <div className={s.tile}>
            <NocturneMark size={120} />
          </div>
          <div className={`${s.tile} ${s.tileLight}`}>
            <div className={s.lockup}>
              <NocturneMark size={56} />
              <span>ATLAS</span>
            </div>
          </div>
          <div className={s.tile}>
            <div className={s.widths}>
              {[75, 100, 125].map((w) => (
                <span key={w} style={{ fontVariationSettings: `"wdth" ${w}` }}>
                  Atlas
                </span>
              ))}
            </div>
          </div>
          <div className={s.swatches}>
            {[
              ["Nuit", "#0A0A0B", "#EDEBE6"],
              ["Craie", "#EDEBE6", "#0A0A0B"],
              ["Graphite", "#2A2A2C", "#EDEBE6"],
              ["Brume", "#8C8B86", "#0A0A0B"],
            ].map(([n, c, f]) => (
              <div key={n} style={{ background: c, color: f }}>
                <strong>{n}</strong>
                <span>{c}</span>
              </div>
            ))}
          </div>
          <div className={s.specimen}>
            <p>
              <strong>Une seule famille : Mona Sans</strong>, variable en
              graisse et en chasse. La typographie s’étire à l’arrivée et au
              défilement : c’est la signature du site, et l’unique effet.
              <br />
              <strong>Pas de couleur d’accent.</strong> La couleur vient des
              projets eux-mêmes. Le noir et blanc les met en valeur.
              <br />
              <strong>Le symbole.</strong> Un disque posé sur une ligne : Atlas
              qui porte le monde. Je porte votre projet de bout en bout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
