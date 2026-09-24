import type { StructureResolver } from "sanity/structure";
import { singletonTypes } from "./schemaTypes";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenus")
    .items([
      S.listItem()
        .title("Réglages du site")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Réglages du site"),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !singletonTypes.has(item.getId() ?? "") &&
          item.getId() !== "translation.metadata",
      ),
    ]);
