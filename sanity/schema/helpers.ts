import { defineField, type SlugIsUniqueValidator } from "sanity";
import { defaultLocale } from "../languages";

/** Champ `language` géré par @sanity/document-internationalization. */
export const languageField = defineField({
  name: "language",
  title: "Langue",
  type: "string",
  readOnly: true,
  hidden: true,
});

/** Un même slug peut exister dans plusieurs langues, mais pas deux fois dans la même. */
export const isUniquePerLanguage: SlugIsUniqueValidator = async (
  slug,
  context,
) => {
  const { document, getClient } = context;
  const id = document?._id?.replace(/^drafts\./, "") ?? "";
  const language = (document?.language as string | undefined) ?? defaultLocale;
  const client = getClient({ apiVersion: "2025-09-01" });
  return client.fetch<boolean>(
    `!defined(*[
      !(_id in [$draft, $published]) &&
      _type == $type &&
      slug.current == $slug &&
      language == $language
    ][0]._id)`,
    {
      draft: `drafts.${id}`,
      published: id,
      type: document?._type ?? "",
      slug,
      language,
    },
  );
};
