import { defaultLocale, isLocale } from "@/i18n/config";
import { getArticle, getSiteSettings } from "@/lib/content";
import { customOgImage, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Inverso Help Center";

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const [article, settings] = await Promise.all([getArticle(locale, slug), getSiteSettings(locale)]);
  if (article?.ogImageUrl) {
    const custom = await customOgImage(article.ogImageUrl);
    if (custom) return custom;
  }
  return renderOgImage({
    locale,
    siteName: settings.title,
    title: article?.title ?? settings.headline,
    eyebrow: article?.collection?.title,
  });
}
