# Atlas

Site vitrine de Raphaël Plassart. Next.js App Router, React, TypeScript.

## Développement

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Renseigner `RESEND_API_KEY`, `MAIL_FROM` (domaine validé chez Resend) et `MAIL_TO` pour recevoir les messages. Sans ces variables, le formulaire signale une indisponibilité, y compris en développement. `MAKE_WEBHOOK_URL` est facultatif. Ne jamais versionner les secrets.

## Vérifications

```sh
npm run typecheck
npm run build
npm audit
```

## Contenus

- Accueil : `app/(site)/page.tsx`.
- Journal : `content/journal.ts`. Ajouter une entrée avec un slug unique et ses sections ; les routes statiques et le sitemap sont générés automatiquement. Il n’y a pas de CMS connecté.
- Réalisation réelle : `app/realisations/permapaysage/page.tsx`. Le visuel de l’accueil est une illustration éditoriale, pas une capture du site livré.
- Identité : `app/studio.css`, `components/studio/`. L’illustration principale est en CSS, sans vidéo ni bibliothèque d’animation côté client.
- SEO : canonicals, données structurées, `app/sitemap.ts`, `app/robots.ts`, image Open Graph générée.

## Avant mise en ligne

Vérifier le domaine canonique `https://atlas.raphael-plassart.com` si le domaine change, les informations contractuelles existantes et les coordonnées. Tester la réception d’un véritable message avec le compte Resend configuré. Configurer une limitation de débit distribuée au niveau de l’hébergeur pour `/api/contact` et `/api/simulator` ; les contrôles de taille, d’origine et le champ piège ne remplacent pas cette protection. Aucun outil d’analytics n’est chargé par cette version.

Le déploiement et la configuration du compte de messagerie ne sont pas automatisés dans ce dépôt.
