import { defineArrayMember, defineField, defineType } from "sanity";
import { isUniquePerLanguage, languageField } from "./helpers";

/** Étude de cas (réalisation client ou produit maison). */
export default defineType({
  name: "project",
  title: "Réalisation",
  type: "document",
  groups: [
    { name: "overview", title: "Aperçu", default: true },
    { name: "story", title: "Étude de cas" },
    { name: "media", title: "Médias" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "overview",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96, isUnique: isUniquePerLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "client", title: "Client", type: "string", group: "overview" }),
    defineField({
      name: "kind",
      title: "Type",
      type: "string",
      group: "overview",
      options: {
        list: [
          { title: "Projet client", value: "client" },
          { title: "Produit", value: "product" },
        ],
        layout: "radio",
      },
      initialValue: "client",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "url", title: "Site en ligne", type: "url", group: "overview" }),
    defineField({
      name: "year",
      title: "Année",
      type: "number",
      group: "overview",
      validation: (Rule) => Rule.integer().min(2000).max(2100),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
      group: "overview",
      description: "Ex. : design, développement, SEO.",
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      group: "overview",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "summary",
      title: "Résumé",
      type: "text",
      rows: 3,
      group: "overview",
    }),
    defineField({
      name: "featured",
      title: "Mis en avant",
      type: "boolean",
      group: "overview",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      group: "overview",
    }),
    defineField({ name: "cover", title: "Couverture", type: "imageWithAlt", group: "media" }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      options: { layout: "grid" },
    }),
    defineField({ name: "challenge", title: "Le point de départ", type: "blockContent", group: "story" }),
    defineField({ name: "approach", title: "La démarche", type: "blockContent", group: "story" }),
    defineField({ name: "results", title: "Les résultats", type: "blockContent", group: "story" }),
    defineField({
      name: "metrics",
      title: "Indicateurs",
      type: "array",
      group: "story",
      description: "Uniquement des chiffres mesurés et documentés.",
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "label", title: "Libellé", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", title: "Valeur", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "note", title: "Note / source", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Témoignage",
      type: "reference",
      group: "story",
      to: [{ type: "testimonial" }],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    { title: "Ordre d'affichage", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", client: "client", language: "language", media: "cover" },
    prepare: ({ title, client, language, media }) => ({
      title,
      subtitle: [language?.toUpperCase(), client].filter(Boolean).join(" · "),
      media,
    }),
  },
});
