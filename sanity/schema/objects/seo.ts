import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Titre SEO",
      type: "string",
      description: "Remplace le titre dans <title> et Open Graph (60 caractères max. conseillés).",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "description",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: "ogImage",
      title: "Image de partage (Open Graph)",
      type: "image",
      description: "1200 × 630 px recommandé. À défaut, l'image de couverture est utilisée.",
    }),
  ],
});
