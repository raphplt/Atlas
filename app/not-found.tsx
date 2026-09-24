import "@/styles/tokens.css";
import "@/styles/base.css";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import Link from "next/link";
import { ContourField } from "@/components/atlas/ContourField";
import { Logo } from "@/components/atlas/Mark";

const display = Funnel_Display({ subsets: ["latin"], variable: "--font-funnel-display" });
const text = Funnel_Sans({ subsets: ["latin"], variable: "--font-funnel-sans" });

// 404 des requêtes hors du segment [locale] (fichiers inconnus, /api…).
// Le layout racine étant transparent, cette page rend son propre <html>.
export default function RootNotFound() {
  return (
    <html lang="fr" className={`${display.variable} ${text.variable}`}>
      <body>
        <main id="main-content" className="band page-hero" style={{ minHeight: "100svh" }}>
          <ContourField className="band-field" levels={12} />
          <div className="wrap">
            <Link href="/" className="brand" aria-label="Atlas">
              <Logo />
            </Link>
            <h1 className="h1" style={{ marginTop: 64 }}>
              Cette page n’est pas sur la carte.
            </h1>
            <p className="lead">L’adresse a peut-être changé. Reprenons depuis un point connu.</p>
            <div className="page-hero-extra">
              <Link href="/" className="btn btn-light">
                Retour à l’accueil
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
