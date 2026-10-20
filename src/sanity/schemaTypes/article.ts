import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { defineField, defineType } from "sanity";
import { slugify } from "@/lib/slugify";
import { languageGroups, localizedFields, requiredIfTranslated } from "./localized";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
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
      defineField({
        name: "description",
        title: "Short description",
        description: "Shown in article lists, search results and as the meta description.",
        type: "text",
        rows: 2,
        validation: (rule) => rule.max(200).warning("Keep descriptions under 200 characters for search engines"),
      }),
      defineField({ name: "body", title: "Body", type: "blockContent" }),
      defineField({
        name: "seoTitle",
        title: "SEO title (optional)",
        description: "Overrides the title in search results and social previews.",
        type: "string",
        validation: (rule) => rule.max(70).warning("Search engines show about 60 characters"),
      }),
    ]),
    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      group: "settings",
      to: [{ type: "helpCollection" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Position in collection",
      type: "number",
      group: "settings",
      initialValue: 100,
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "settings",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      description: "Defaults to the last edit date when empty.",
      type: "datetime",
      group: "settings",
    }),
    defineField({
      name: "ogImage",
      title: "Social share image (optional)",
      description: "1200×630. A branded image with the article title is generated automatically when empty.",
      type: "image",
      group: "settings",
    }),
    defineField({
      name: "legacyId",
      title: "Intercom ID",
      type: "string",
      group: "settings",
      readOnly: true,
      hidden: ({ value }) => !value,
    }),
  ],
  orderings: [{ title: "Position", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "bg.title", en: "en.title", collection: "collection.bg.title" },
    prepare: ({ title, en, collection }) => ({
      title,
      subtitle: [collection, en ? `EN: ${en}` : "EN: not translated"].filter(Boolean).join(" · "),
    }),
  },
});
