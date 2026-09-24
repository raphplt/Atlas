import "./globals.css";
import "./studio.css";
import Link from "next/link";

// 404 des requêtes hors du segment [locale] (fichiers inconnus, /api, /lab…).
// Le layout racine étant transparent, cette page rend son propre <html>.
export default function RootNotFound() {
  return (
    <html lang="fr">
      <body className="atlas-body">
        <main id="main-content" className="article-wrap">
          <p className="eyebrow">404 / HORS CADRE</p>
          <h1>Cette page est introuvable.</h1>
          <Link className="button" href="/">
            Retour à l’atelier ↗
          </Link>
        </main>
      </body>
    </html>
  );
}
