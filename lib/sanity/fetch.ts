import type { QueryParams } from "next-sanity";
import { client } from "./client";

/** Durée de revalidation par défaut (filet de sécurité si le webhook ne passe pas). */
export const DEFAULT_REVALIDATE = 3600;

/**
 * Requête GROQ avec cache Next (tags + revalidate).
 * Renvoie `null` si Sanity n'est pas configuré ou injoignable : l'appelant
 * prévoit alors un contenu de repli.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = DEFAULT_REVALIDATE,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate, tags },
    });
  } catch (error) {
    console.error("[sanity] Requête impossible :", error);
    return null;
  }
}
