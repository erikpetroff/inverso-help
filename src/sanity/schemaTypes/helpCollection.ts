import { FolderIcon } from "@sanity/icons/Folder";
import { defineField, defineType } from "sanity";
import { COLLECTION_ICONS } from "@/lib/icons";
import { slugify } from "@/lib/slugify";
import { languageGroups, localizedFields, requiredIfTranslated } from "./localized";

export const helpCollection = defineType({
  name: "helpCollection",
  title: "Collection",
  type: "document",
  icon: FolderIcon,
  groups: [...languageGroups, { name: "settings", title: "Settings" }],
  fields: [
    ...localizedFields((locale) => [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
        validation: (rule) => (locale === "bg" ? rule.required() : rule),
      }),
      defineField({
        name: "slug",
        title: "URL slug",
        type: "slug",
        options: { source: `${locale}.title`, slugify },
        validation: (rule) => rule.custom(requiredIfTranslated("Generate a slug for this language")),
      }),
      defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    ]),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      group: "settings",
      initialValue: "folder",
      options: {
        list: Object.entries(COLLECTION_ICONS).map(([value, { title }]) => ({ value, title: `${title} (${value})` })),
      },
    }),
    defineField({
      name: "order",
      title: "Position",
      description: "Lower numbers appear first on the homepage.",
      type: "number",
      group: "settings",
      initialValue: 100,
    }),
    defineField({
      name: "legacyId",
      title: "Intercom ID",
      description: "Used to redirect old Intercom URLs.",
      type: "string",
      group: "settings",
      readOnly: true,
      hidden: ({ value }) => !value,
    }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "bg.title", en: "en.title" },
    prepare: ({ title, en }) => ({ title, subtitle: en ? `EN: ${en}` : "EN: not translated" }),
  },
});
