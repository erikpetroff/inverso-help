import { createClient } from "next-sanity";
import seed from "../../content/seed.json";
import type { Locale } from "@/i18n/config";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";
import type { ArticleBody, Author } from "./types";

type Localized<T> = Partial<Record<Locale, T | null>>;

export type CollectionTranslation = { title?: string; slug?: string; description?: string };
export type ArticleTranslation = {
  title?: string;
  slug?: string;
  description?: string;
  seoTitle?: string;
  body?: ArticleBody;
};
export type SettingsTranslation = {
  title?: string;
  headline?: string;
  description?: string;
  searchPlaceholder?: string;
  footerText?: string;
};

export type RawCollection = Localized<CollectionTranslation> & {
  _id: string;
  icon?: string;
  order?: number;
  legacyId?: string;
};

export type RawArticle = Localized<ArticleTranslation> & {
  _id: string;
  order?: number;
  legacyId?: string;
  collectionId?: string;
  authorId?: string;
  ogImageUrl?: string | null;
  updatedAt: string;
};

export type RawSettings = Localized<SettingsTranslation> & {
  mainSiteUrl?: string;
  logoUrl?: string | null;
  ogImageUrl?: string | null;
};

export type Dataset = {
  source: "sanity" | "local";
  settings: RawSettings;
  authors: Record<string, Author>;
  collections: RawCollection[];
  articles: RawArticle[];
};

const localizedCollection = (l: Locale) => `"${l}": ${l}{ title, "slug": slug.current, description }`;
const localizedArticle = (l: Locale) =>
  `"${l}": ${l}{ title, "slug": slug.current, description, seoTitle, body }`;
const localizedSettings = (l: Locale) => `"${l}": ${l}{ title, headline, description, searchPlaceholder, footerText }`;

const DATASET_QUERY = /* groq */ `{
  "settings": *[_id == "siteSettings"][0]{
    mainSiteUrl,
    "logoUrl": logo.asset->url,
    "ogImageUrl": ogImage.asset->url,
    ${localizedSettings("bg")},
    ${localizedSettings("en")}
  },
  "authors": *[_type == "author"]{ _id, name, "avatarUrl": avatar.asset->url },
  "collections": *[_type == "helpCollection"]{
    _id, icon, order, legacyId,
    ${localizedCollection("bg")},
    ${localizedCollection("en")}
  },
  "articles": *[_type == "article"]{
    _id, order, legacyId,
    "collectionId": collection._ref,
    "authorId": author._ref,
    "ogImageUrl": ogImage.asset->url,
    "updatedAt": coalesce(updatedAt, _updatedAt),
    ${localizedArticle("bg")},
    ${localizedArticle("en")}
  }
}`;

type QueryResult = {
  settings: RawSettings | null;
  authors: ({ _id: string } & Author)[];
  collections: RawCollection[];
  articles: RawArticle[];
};

async function fetchFromSanity(): Promise<Dataset> {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: "published" });
  const result = await client.fetch<QueryResult>(DATASET_QUERY);
  return {
    source: "sanity",
    settings: result.settings ?? {},
    authors: Object.fromEntries(result.authors.map(({ _id, ...a }) => [_id, a])),
    collections: result.collections,
    articles: result.articles,
  };
}

type SeedDoc = Record<string, unknown> & { _id: string; _type: string };
type WithSlugObject = { slug?: { current?: string } } & Record<string, unknown>;

function flattenSlugs<T>(doc: SeedDoc): T {
  const out: Record<string, unknown> = { ...doc };
  for (const locale of ["bg", "en"] as const) {
    const t = doc[locale] as WithSlugObject | undefined;
    if (t) out[locale] = { ...t, slug: t.slug?.current };
  }
  return out as T;
}

function fromSeed(): Dataset {
  const docs = seed as SeedDoc[];
  const ref = (v: unknown) => (v as { _ref?: string } | undefined)?._ref;
  return {
    source: "local",
    settings: (docs.find((d) => d._type === "siteSettings") ?? {}) as RawSettings,
    authors: Object.fromEntries(
      docs.filter((d) => d._type === "author").map((d) => [d._id, { name: String(d.name) }]),
    ),
    collections: docs.filter((d) => d._type === "helpCollection").map((d) => flattenSlugs<RawCollection>(d)),
    articles: docs
      .filter((d) => d._type === "article")
      .map((d) => ({
        ...flattenSlugs<RawArticle>(d),
        collectionId: ref(d.collection),
        authorId: ref(d.author),
      })),
  };
}

export async function loadDataset(): Promise<Dataset> {
  return isSanityConfigured ? fetchFromSanity() : fromSeed();
}
