import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({ name: "role", title: "Rôle", type: "string" }),
    defineField({ name: "image", title: "Photo", type: "imageWithAlt" }),
    defineField({ name: "url", title: "Page de profil", type: "url" }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
