import type { Metadata } from "next";
import { defaultLocale, localeMeta, locales, siteUrl, type Alternates, type Locale } from "@/i18n/config";

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${siteUrl}${path}`);

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

export function pageMetadata(seo: PageSeo): Metadata {
  const url = seo.alternates[seo.locale] ? absoluteUrl(seo.alternates[seo.locale]!) : undefined;
  const otherLocales = locales.filter((l) => l !== seo.locale && seo.alternates[l]).map((l) => localeMeta[l].og);
  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates: languageAlternates(seo.locale, seo.alternates),
    openGraph: {
      type: seo.type ?? "website",
      url,
      siteName: seo.siteName,
      title: seo.title,
      description: seo.description,
      locale: localeMeta[seo.locale].og,
      alternateLocale: otherLocales,
      ...(seo.type === "article" && seo.publishedTime ? { modifiedTime: seo.publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
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
