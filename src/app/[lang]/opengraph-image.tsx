import { defaultLocale, isLocale } from "@/i18n/config";
import { getSiteSettings } from "@/lib/content";
import { customOgImage, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Inverso Help Center";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const settings = await getSiteSettings(locale);
  if (settings.ogImageUrl) {
    const custom = await customOgImage(settings.ogImageUrl);
    if (custom) return custom;
  }
  return renderOgImage({ locale, siteName: settings.title, title: settings.headline, description: settings.description });
}
