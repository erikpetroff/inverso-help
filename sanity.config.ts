import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { studioDataset, studioProjectId } from "./src/sanity/studio-env";

const SINGLETONS = new Set(["siteSettings"]);

export default defineConfig({
  name: "inverso-help",
  title: "Inverso Help Center",
  projectId: studioProjectId,
  dataset: studioDataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter(({ schemaType }) => !SINGLETONS.has(schemaType)),
      {
        id: "article-in-collection",
        title: "Article in collection",
        schemaType: "article",
        parameters: [{ name: "collectionId", type: "string" }],
        value: (params: { collectionId: string }) => ({
          collection: { _type: "reference", _ref: params.collectionId },
          author: { _type: "reference", _ref: "author-inverso" },
        }),
      },
    ],
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.has(schemaType)
        ? actions.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
