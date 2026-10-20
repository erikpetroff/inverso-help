import { cacheLife, cacheTag } from "next/cache";
import { locales, localePath, type Alternates, type Locale } from "@/i18n/config";
import {
  loadDataset,
  type ArticleTranslation,
  type CollectionTranslation,
  type Dataset,
  type RawArticle,
  type RawCollection,
} from "./dataset";
import { bodyToPlainText } from "./portable-text";
import type {
  ArticleDetail,
  ArticleSummary,
  Author,
  CollectionDetail,
  CollectionSummary,
  SearchResult,
  SiteSettings,
} from "./types";

export const CONTENT_TAG = "sanity";

const DEFAULT_AUTHOR: Author = { name: "Inverso" };

const DEFAULT_SETTINGS: Record<Locale, Omit<SiteSettings, "mainSiteUrl" | "logoUrl" | "ogImageUrl">> = {
  bg: {
    title: "Inverso Help Center",
    headline: "Съвети и отговори от екипа на Inverso.bg",
    description:
      "Ръководства и отговори на често задавани въпроси за Inverso.bg – фактури, клиенти, плащания, проекти и настройки на профила.",
    searchPlaceholder: "Търсене на статии...",
    footerText: "Inverso Help Center",
  },
  en: {
    title: "Inverso Help Center",
    headline: "Tips and answers from the Inverso.bg team",
    description:
      "Guides and answers to common questions about Inverso.bg – invoices, clients, payments, projects and account settings.",
    searchPlaceholder: "Search for articles...",
    footerText: "Inverso Help Center",
  },
};

async function getDataset(): Promise<Dataset> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  return loadDataset();
}

type Translated<T> = T & { title: string; slug: string };

function translation<T extends CollectionTranslation | ArticleTranslation>(
  doc: Partial<Record<Locale, T | null>>,
  locale: Locale,
): Translated<T> | null {
  const t = doc[locale];
  return t?.title && t.slug ? (t as Translated<T>) : null;
}

const byOrder = (locale: Locale) => (a: RawCollection | RawArticle, b: RawCollection | RawArticle) =>
  (a.order ?? 100) - (b.order ?? 100) ||
  (a[locale]?.title ?? "").localeCompare(b[locale]?.title ?? "", locale, { numeric: true });

function authorOf(data: Dataset, article: RawArticle): Author {
  const author = (article.authorId && data.authors[article.authorId]) || DEFAULT_AUTHOR;
  return { ...author, avatarUrl: author.avatarUrl ?? "/brand/avatar.png" };
}

function toSummary(data: Dataset, a: RawArticle, t: Translated<ArticleTranslation>): ArticleSummary {
  return {
    _id: a._id,
    title: t.title,
    slug: t.slug,
    description: t.description ?? undefined,
    updatedAt: a.updatedAt,
    author: authorOf(data, a),
  };
}

function articlesIn(data: Dataset, locale: Locale, collectionId: string) {
  return data.articles
    .filter((a) => a.collectionId === collectionId && translation(a, locale))
    .sort(byOrder(locale))
    .map((a) => ({ raw: a, t: translation(a, locale)! }));
}

function summarizeCollection(data: Dataset, locale: Locale, c: RawCollection): CollectionSummary | null {
  const t = translation(c, locale);
  if (!t) return null;
  const articles = articlesIn(data, locale, c._id);
  const authors = new Map<string, Author>();
  for (const { raw } of articles) {
    const author = authorOf(data, raw);
    authors.set(author.name, author);
  }
  return {
    _id: c._id,
    title: t.title,
    slug: t.slug,
    description: t.description ?? undefined,
    icon: c.icon,
    articleCount: articles.length,
    authors: [...authors.values()],
  };
}

function alternatesFor(doc: RawCollection | RawArticle, kind: "articles" | "collections"): Alternates {
  const out: Alternates = {};
  for (const locale of locales) {
    const t = translation(doc, locale);
    if (t) out[locale] = localePath(locale, `/${kind}/${t.slug}`);
  }
  return out;
}

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const { settings } = await getDataset();
  const t = Object.fromEntries(Object.entries(settings[locale] ?? {}).filter(([, v]) => v));
  return {
    ...DEFAULT_SETTINGS[locale],
    ...t,
    mainSiteUrl: settings.mainSiteUrl ?? "https://inverso.bg",
    logoUrl: settings.logoUrl ?? null,
    ogImageUrl: settings.ogImageUrl ?? null,
  };
}

export async function getCollections(locale: Locale): Promise<CollectionSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const data = await getDataset();
  return [...data.collections]
    .sort(byOrder(locale))
    .map((c) => summarizeCollection(data, locale, c))
    .filter((c): c is CollectionSummary => c !== null);
}

export async function getCollection(locale: Locale, slug: string): Promise<CollectionDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const data = await getDataset();
  const raw = data.collections.find((c) => translation(c, locale)?.slug === slug);
  const summary = raw && summarizeCollection(data, locale, raw);
  if (!raw || !summary) return null;
  return {
    ...summary,
    articles: articlesIn(data, locale, raw._id).map(({ raw: a, t }) => toSummary(data, a, t)),
    alternates: alternatesFor(raw, "collections"),
  };
}

export async function getArticle(locale: Locale, slug: string): Promise<ArticleDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const data = await getDataset();
  const a = data.articles.find((x) => translation(x, locale)?.slug === slug);
  const t = a && translation(a, locale);
  if (!a || !t) return null;
  const collection = data.collections.find((c) => c._id === a.collectionId);
  const ct = collection && translation(collection, locale);
  const related = collection
    ? articlesIn(data, locale, collection._id)
        .filter(({ raw }) => raw._id !== a._id)
        .slice(0, 5)
        .map(({ raw, t: rt }) => toSummary(data, raw, rt))
    : [];
  return {
    ...toSummary(data, a, t),
    body: t.body ?? [],
    seoTitle: t.seoTitle ?? undefined,
    ogImageUrl: a.ogImageUrl ?? null,
    collection: ct ? { title: ct.title, slug: ct.slug } : null,
    related,
    alternates: alternatesFor(a, "articles"),
  };
}

export async function getStaticSlugs(locale: Locale): Promise<{ collections: string[]; articles: string[] }> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const data = await getDataset();
  const slugs = (docs: (RawCollection | RawArticle)[]) =>
    docs.map((d) => translation(d, locale)?.slug).filter((s): s is string => Boolean(s));
  return { collections: slugs(data.collections), articles: slugs(data.articles) };
}

export type SitemapEntry = { alternates: Alternates; lastModified?: string };

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const data = await getDataset();
  const home: Alternates = Object.fromEntries(locales.map((l) => [l, localePath(l)]));
  return [
    { alternates: home },
    ...data.collections.map((c) => ({ alternates: alternatesFor(c, "collections") })),
    ...data.articles.map((a) => ({ alternates: alternatesFor(a, "articles"), lastModified: a.updatedAt })),
  ].filter((e) => Object.keys(e.alternates).length > 0);
}

export async function resolveLegacyPath(kind: "articles" | "collections", legacyId: string): Promise<string | null> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const data = await getDataset();
  const list: (RawArticle | RawCollection)[] = kind === "articles" ? data.articles : data.collections;
  const match = list.find((x) => x.legacyId === legacyId);
  return match ? (alternatesFor(match, kind).bg ?? null) : null;
}

function normalize(s: string, locale: Locale) {
  return s.toLocaleLowerCase(locale).replace(/[„“”"'’]/g, "");
}

function excerptAround(text: string, lower: string, terms: string[], radius = 90): string | undefined {
  const idx = terms.map((t) => lower.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
  if (idx === undefined) return undefined;
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + radius * 2);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).replace(/\s+/g, " ").trim()}${end < text.length ? "…" : ""}`;
}

export async function searchArticles(locale: Locale, query: string): Promise<SearchResult[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(CONTENT_TAG);
  const terms = normalize(query, locale).split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return [];
  const data = await getDataset();

  return data.articles
    .map((a) => {
      const t = translation(a, locale);
      if (!t) return null;
      const title = normalize(t.title, locale);
      const description = normalize(t.description ?? "", locale);
      const plain = bodyToPlainText(t.body);
      const body = normalize(plain, locale);
      let score = 0;
      for (const term of terms) {
        const inTitle = title.includes(term);
        const inDescription = description.includes(term);
        const inBody = body.includes(term);
        if (!inTitle && !inDescription && !inBody) return null;
        score += (inTitle ? 10 : 0) + (inDescription ? 4 : 0) + (inBody ? 1 : 0);
      }
      const collection = data.collections.find((c) => c._id === a.collectionId);
      const ct = collection && translation(collection, locale);
      const result: SearchResult = {
        ...toSummary(data, a, t),
        collection: ct ? { title: ct.title, slug: ct.slug } : null,
        excerpt: excerptAround(plain, body, terms),
      };
      return { score, result };
    })
    .filter((x): x is { score: number; result: SearchResult } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((x) => x.result);
}
