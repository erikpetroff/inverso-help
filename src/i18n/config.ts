export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export const localeMeta: Record<Locale, { label: string; short: string; intl: string; og: string; hreflang: string }> = {
  bg: { label: "Български", short: "BG", intl: "bg-BG", og: "bg_BG", hreflang: "bg" },
  en: { label: "English", short: "EN", intl: "en-US", og: "en_US", hreflang: "en" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://help.inverso.bg").replace(/\/$/, "");

/** Public path for a locale: Bulgarian lives at the root, other languages are prefixed ("/en/articles/x"). */
export function localePath(locale: Locale, path = "/") {
  if (locale === defaultLocale) return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Maps each locale to the equivalent path of the current page (null if the page isn't translated). */
export type Alternates = Partial<Record<Locale, string>>;
