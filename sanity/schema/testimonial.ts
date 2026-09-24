import { defineField, defineType } from "sanity";
import { languageField } from "./helpers";

export default defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  fields: [
    languageField,
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorName",
      title: "Nom de l'auteur",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "role", title: "Rôle", type: "string" }),
    defineField({ name: "company", title: "Entreprise", type: "string" }),
    defineField({
      name: "url",
      title: "Source (lien)",
      type: "url",
      description: "Publication d'origine (LinkedIn, Google…), pour la vérifiabilité.",
    }),
    defineField({ name: "photo", title: "Photo", type: "imageWithAlt" }),
  ],
  preview: {
    select: {
      title: "authorName",
      company: "company",
      language: "language",
      media: "photo",
    },
    prepare: ({ title, company, language, media }) => ({
      title,
      subtitle: [language?.toUpperCase(), company].filter(Boolean).join(" · "),
      media,
    }),
  },
});
