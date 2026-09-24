import { defineArrayMember, defineField, defineType } from "sanity";

/** Document unique (singleton) : réglages globaux du site. */
export default defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "E-mail de contact",
      type: "string",
      initialValue: "contact@raphael-plassart.com",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "availability",
      title: "Disponibilité",
      type: "string",
      description: "Ex. : « Disponible pour de nouveaux projets à partir de janvier ».",
    }),
    defineField({
      name: "socialLinks",
      title: "Réseaux sociaux",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "label", title: "Libellé", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Réglages du site" }) },
});
