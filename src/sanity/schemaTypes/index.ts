import type { SchemaTypeDefinition } from "sanity";
import { article } from "./article";
import { author } from "./author";
import { blockContent, divider } from "./blockContent";
import { helpCollection } from "./helpCollection";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  helpCollection,
  article,
  author,
  blockContent,
  divider,
];
