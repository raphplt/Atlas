import { defineField, defineType } from "sanity";
import { isUniquePerLanguage, languageField } from "./helpers";

export default defineType({
  name: "post",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Contenu", default: true },
    { name: "meta", title: "Métadonnées" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    languageField,
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96, isUnique: isUniquePerLanguage },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Chapô",
      type: "text",
      rows: 3,
      group: "content",
      description: "Résumé affiché dans les listes et en introduction.",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "cover",
      title: "Image de couverture",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
      group: "meta",
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "author" }],
      group: "meta",
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      group: "meta",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Date de mise à jour",
      type: "datetime",
      group: "meta",
    }),
    defineField({
      name: "readingTime",
      title: "Temps de lecture (minutes)",
      type: "number",
      group: "meta",
      validation: (Rule) => Rule.min(1).integer(),
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Date de publication (récent)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      language: "language",
      date: "publishedAt",
      media: "cover",
    },
    prepare: ({ title, language, date, media }) => ({
      title,
      subtitle: [language?.toUpperCase(), date?.slice(0, 10)]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
