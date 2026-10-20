import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales, siteUrl, type Alternates, type Locale } from "@/i18n/config";
import { splitNumber } from "./portable-text";

/** Next.js drops the trailing slash from the root canonical, so the root is siteUrl everywhere (sitemap, JSON-LD). */
export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : path === "/" ? siteUrl : `${siteUrl}${path}`;

const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

/** Shortens text to a search-snippet length at a word boundary. */
export function clampDescription(text: string, max = DESCRIPTION_MAX) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max * 0.6)).replace(/[\s,;:–-]+$/, "")}…`;
}

const comparable = (s: string) => splitNumber(s).text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

/** True when a description only restates the title, which makes a poor search snippet. */
export function repeatsTitle(title: string, description: string) {
  return comparable(description) === comparable(title);
}

/** canonical + hreflang links (including x-default) for a page available in the given languages. */
export function languageAlternates(locale: Locale, alternates: Alternates): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    if (alternates[l]) languages[localeMeta[l].hreflang] = absoluteUrl(alternates[l]!);
  }
  const xDefault = alternates[defaultLocale] ?? alternates[locale];
  if (xDefault) languages["x-default"] = absoluteUrl(xDefault);
  return { canonical: alternates[locale] ? absoluteUrl(alternates[locale]!) : undefined, languages };
}

type PageSeo = {
  locale: Locale;
  title: string;
  description?: string;
  alternates: Alternates;
  siteName: string;
  type?: "website" | "article";
  publishedTime?: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
};

/**
 * Page <title>: the outline number ("2. ") is dropped, and the " | site name" suffix only
 * added when the result still fits in a search result (~60 characters).
 */
function documentTitle(seo: PageSeo) {
  if (seo.absoluteTitle) return seo.title;
  const suffixed = `${seo.title} | ${seo.siteName}`;
  return suffixed.length <= TITLE_MAX ? suffixed : seo.title;
}

export function pageMetadata(input: PageSeo): Metadata {
  const seo = { ...input, title: input.absoluteTitle ? input.title : splitNumber(input.title).text };
  const description = seo.description && clampDescription(seo.description);
  const url = seo.alternates[seo.locale] ? absoluteUrl(seo.alternates[seo.locale]!) : undefined;
  const otherLocales = locales.filter((l) => l !== seo.locale && seo.alternates[l]).map((l) => localeMeta[l].og);
  return {
    title: { absolute: documentTitle(seo) },
    description,
    alternates: languageAlternates(seo.locale, seo.alternates),
    openGraph: {
      type: seo.type ?? "website",
      url,
      siteName: seo.siteName,
      title: seo.title,
      description,
      locale: localeMeta[seo.locale].og,
      alternateLocale: otherLocales,
      ...(seo.type === "article" && seo.publishedTime ? { modifiedTime: seo.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description,
    },
    ...(seo.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
