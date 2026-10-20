import type { MetadataRoute } from "next";
import { localeMeta, locales } from "@/i18n/config";
import { getSitemapEntries } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getSitemapEntries();
  return entries.flatMap(({ alternates, lastModified }) => {
    const languages = Object.fromEntries(
      locales.filter((l) => alternates[l]).map((l) => [localeMeta[l].hreflang, absoluteUrl(alternates[l]!)]),
    );
    return locales
      .filter((l) => alternates[l])
      .map((l) => ({
        url: absoluteUrl(alternates[l]!),
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages },
      }));
  });
}
