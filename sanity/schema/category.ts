import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Catégorie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 64 },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});
