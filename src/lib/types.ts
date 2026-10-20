import type { PortableTextBlock } from "@portabletext/types";
import type { Alternates } from "@/i18n/config";

export type ImageRef = { asset?: { _ref: string }; alt?: string; caption?: string } | null;

export type SiteSettings = {
  title: string;
  headline: string;
  description: string;
  searchPlaceholder?: string;
  footerText?: string;
  mainSiteUrl?: string;
  logoUrl?: string | null;
  ogImageUrl?: string | null;
};

export type Author = {
  name: string;
  avatarUrl?: string | null;
};

export type CollectionSummary = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  icon?: string;
  articleCount: number;
  authors: Author[];
};

export type ArticleSummary = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  updatedAt: string;
  author?: Author | null;
};

export type CollectionDetail = CollectionSummary & {
  articles: ArticleSummary[];
  alternates: Alternates;
};

export type ArticleBody = (
  | PortableTextBlock
  | { _type: "divider"; _key: string }
  | ({ _type: "image"; _key: string } & NonNullable<ImageRef>)
)[];

export type ArticleDetail = ArticleSummary & {
  body: ArticleBody;
  seoTitle?: string;
  ogImageUrl?: string | null;
  collection: { title: string; slug: string } | null;
  related: ArticleSummary[];
  previous: ArticleSummary | null;
  next: ArticleSummary | null;
  alternates: Alternates;
};

export type SearchResult = ArticleSummary & {
  collection: { title: string; slug: string } | null;
  excerpt?: string;
};
