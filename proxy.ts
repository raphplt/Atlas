import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclut : API, Studio Sanity, prototypes /lab, fichiers internes Next/Vercel,
  // l'image OG générée et tout chemin avec extension (sitemap.xml, robots.txt…).
  // Les flux RSS (/blog/rss.xml, /en/blog/rss.xml) passent par le proxy pour être localisés.
  matcher: [
    "/((?!api|studio|lab|_next|_vercel|opengraph-image|.*\\..*).*)",
    "/blog/rss.xml",
    "/:locale/blog/rss.xml",
  ],
};
