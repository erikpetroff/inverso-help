import { defineField, type FieldDefinition } from "sanity";
import { localeMeta, locales, type Locale } from "@/i18n/config";

export const languageGroups = locales.map((locale, i) => ({
  name: locale,
  title: localeMeta[locale].label,
  default: i === 0,
}));

/** One object field per language (`bg`, `en`), each shown in its own tab. */
export function localizedFields(build: (locale: Locale) => FieldDefinition[]) {
  return locales.map((locale) =>
    defineField({
      name: locale,
      title: localeMeta[locale].label,
      type: "object",
      group: locale,
      options: { collapsible: false },
      fields: build(locale),
    }),
  );
}

/** Required when the language version has a title, so untranslated documents can stay empty. */
export const requiredIfTranslated = (message: string) => (value: unknown, context: { parent?: unknown }) => {
  const parent = context.parent as { title?: string } | undefined;
  if (parent?.title && !value) return message;
  return true;
};
