import type { SchemaTypeDefinition } from "sanity";
import author from "./schema/author";
import category from "./schema/category";
import blockContent from "./schema/objects/blockContent";
import imageWithAlt from "./schema/objects/imageWithAlt";
import seo from "./schema/objects/seo";
import post from "./schema/post";
import project from "./schema/project";
import siteSettings from "./schema/siteSettings";
import testimonial from "./schema/testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    post,
    project,
    testimonial,
    category,
    author,
    siteSettings,
    // Objets
    blockContent,
    imageWithAlt,
    seo,
  ],
};

/** Types traduits via @sanity/document-internationalization. */
export const translatedTypes = ["post", "project", "testimonial"];

/** Documents uniques (singletons) : identifiant fixe = nom du type. */
export const singletonTypes = new Set(["siteSettings"]);
