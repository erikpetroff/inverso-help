import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";
import { languageGroups, localizedFields } from "./localized";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  groups: [...languageGroups, { name: "settings", title: "Shared" }],
  fields: [
    ...localizedFields(() => [
      defineField({ name: "title", title: "Help center name", type: "string" }),
      defineField({ name: "headline", title: "Homepage headline", type: "string" }),
      defineField({
        name: "description",
        title: "Meta description",
        description: "Used by search engines and social previews for the homepage.",
        type: "text",
        rows: 2,
        validation: (rule) => rule.max(200).warning("Keep it under 160–200 characters"),
      }),
      defineField({ name: "searchPlaceholder", title: "Search placeholder", type: "string" }),
      defineField({
        name: "footerText",
        title: "Footer text",
        description: "Shown at the bottom right of every page and linked to the main website, e.g. “© 2026 Inverso.bg”.",
        type: "string",
      }),
    ]),
    defineField({
      name: "logo",
      title: "Logo",
      description: "Light (white) logo for the dark header. Falls back to the Inverso wordmark.",
      type: "image",
      group: "settings",
    }),
    defineField({
      name: "ogImage",
      title: "Default social share image (optional)",
      description: "1200×630. A branded image is generated automatically when empty.",
      type: "image",
      group: "settings",
    }),
    defineField({ name: "mainSiteUrl", title: "Main website URL", type: "url", group: "settings" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
