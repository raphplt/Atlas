import { defineArrayMember, defineField, defineType } from "sanity";

/** Texte riche (Portable Text) : paragraphes, titres, listes, liens, images, code, encadrés. */
export default defineType({
  name: "blockContent",
  title: "Contenu",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraphe", value: "normal" },
        { title: "Titre 2", value: "h2" },
        { title: "Titre 3", value: "h3" },
        { title: "Titre 4", value: "h4" },
        { title: "Citation", value: "blockquote" },
      ],
      lists: [
        { title: "Puces", value: "bullet" },
        { title: "Numérotée", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Gras", value: "strong" },
          { title: "Italique", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Lien",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
    defineArrayMember({
      name: "codeBlock",
      title: "Bloc de code",
      type: "object",
      fields: [
        defineField({ name: "code", title: "Code", type: "text" }),
        defineField({
          name: "language",
          title: "Langage",
          type: "string",
          options: {
            list: [
              "typescript",
              "javascript",
              "tsx",
              "html",
              "css",
              "json",
              "bash",
              "sql",
            ],
          },
        }),
        defineField({ name: "filename", title: "Nom de fichier", type: "string" }),
      ],
      preview: {
        select: { title: "filename", subtitle: "language" },
        prepare: ({ title, subtitle }) => ({
          title: title || "Bloc de code",
          subtitle,
        }),
      },
    }),
    defineArrayMember({
      name: "callout",
      title: "Encadré",
      type: "object",
      fields: [
        defineField({
          name: "tone",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Info", value: "info" },
              { title: "Conseil", value: "tip" },
              { title: "Attention", value: "warning" },
            ],
            layout: "radio",
          },
          initialValue: "info",
        }),
        defineField({ name: "text", title: "Texte", type: "text", rows: 4 }),
      ],
      preview: {
        select: { title: "text", subtitle: "tone" },
      },
    }),
  ],
});
