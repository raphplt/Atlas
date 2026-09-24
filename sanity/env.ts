// Configuration Sanity. Ne lève jamais d'erreur si les variables manquent :
// le site se construit et fonctionne avec des contenus de repli (content/journal.ts).
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);

// Lectures publiques via le CDN de l'API Sanity (apicdn.sanity.io) : plus rapide et moins coûteux.
export const useCdn = true;

export const studioBasePath = "/studio";
