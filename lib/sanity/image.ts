import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** URL d'une image Sanity (redimensionnée par le CDN Sanity, format auto). */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/** Image Sanity telle que renvoyée par les requêtes GROQ (voir queries.ts). */
export type SanityImage = {
  asset?: { _ref: string; _type?: string };
  alt?: string | null;
  caption?: string | null;
  hotspot?: unknown;
  crop?: unknown;
  dimensions?: { width: number; height: number } | null;
  lqip?: string | null;
};

export function hasAsset(image?: SanityImage | null): image is SanityImage & {
  asset: { _ref: string };
} {
  return Boolean(image?.asset?._ref);
}
