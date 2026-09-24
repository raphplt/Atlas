import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Texte alternatif",
      type: "string",
      description: "Décrit l'image pour les lecteurs d'écran. Laisser vide si décorative.",
    }),
    defineField({
      name: "caption",
      title: "Légende",
      type: "string",
    }),
  ],
});
