import { createClient, type SanityClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  useCdn,
} from "@/sanity/env";

/** Client de lecture (contenus publiés). `null` tant que Sanity n'est pas configuré. */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      perspective: "published",
      // Jeton optionnel : uniquement si le dataset est privé.
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;
