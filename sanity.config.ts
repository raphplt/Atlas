"use client";

import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId, studioBasePath } from "./sanity/env";
import { supportedLanguages } from "./sanity/languages";
import { schema, singletonTypes, translatedTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "atlas",
  title: "Atlas",
  basePath: studioBasePath,
  projectId,
  dataset,
  schema: {
    ...schema,
    // Pas de création libre des singletons depuis le menu « Nouveau document ».
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Pas de suppression / duplication des singletons.
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action),
          )
        : prev,
  },
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages,
      schemaTypes: translatedTypes,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
