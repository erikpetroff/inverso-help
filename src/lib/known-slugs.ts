import type { Locale } from "@/i18n/config";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const TTL_MS = 60_000;
const QUERY = /* groq */ `{
  "articles": *[_type == "article"]{ "bg": bg.slug.current, "en": en.slug.current },
  "collections": *[_type == "helpCollection"]{ "bg": bg.slug.current, "en": en.slug.current }
}`;

type Kind = "articles" | "collections";
type SlugRow = Partial<Record<Locale, string | null>>;

let cache: { at: number; paths: Promise<Set<string> | null> } | null = null;

async function load(): Promise<Set<string> | null> {
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(QUERY)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return null;
    const { result } = (await res.json()) as { result: Record<Kind, SlugRow[]> };
    const paths = new Set<string>();
    for (const kind of ["articles", "collections"] as const) {
      for (const row of result[kind]) {
        for (const [locale, slug] of Object.entries(row)) if (slug) paths.add(`${locale}/${kind}/${slug}`);
      }
    }
    return paths;
  } catch {
    return null;
  }
}

/**
 * Whether a collection/article slug exists, checked in Proxy so unknown URLs get a real 404 status
 * (pages stream, and a notFound() inside Suspense can only send a 200 with a noindex tag).
 * Returns true when Sanity can't be reached, so pages still render and decide for themselves.
 */
export async function slugExists(locale: Locale, kind: Kind, slug: string): Promise<boolean> {
  if (!cache || Date.now() - cache.at > TTL_MS) cache = { at: Date.now(), paths: load() };
  const paths = await cache.paths;
  return paths ? paths.has(`${locale}/${kind}/${slug}`) : true;
}
