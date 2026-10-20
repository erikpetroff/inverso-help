import { defaultLocale, isLocale } from "@/i18n/config";
import { getCollection, getSiteSettings } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Inverso Help Center";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const [collection, settings] = await Promise.all([getCollection(locale, slug), getSiteSettings(locale)]);
  return renderOgImage({
    locale,
    siteName: settings.title,
    title: collection?.title ?? settings.headline,
    description: collection?.description,
  });
}
