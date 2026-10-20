import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/help/site-footer";
import { localeMeta, locales, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getSiteSettings } from "@/lib/content";
import { inter } from "../fonts";
import "../globals.css";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: settings.title, template: `%s | ${settings.title}` },
    description: settings.description,
    applicationName: settings.title,
    openGraph: { siteName: settings.title, locale: localeMeta[locale].og },
    formatDetection: { telephone: false },
    icons: { icon: "/icon.png", apple: "/icon.png" },
    manifest: "/manifest.webmanifest",
  };
}

export const viewport: Viewport = {
  themeColor: "#1c1c1c",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return (
    <html lang={localeMeta[locale].hreflang} className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:shadow"
        >
          {t.skipToContent}
        </a>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
