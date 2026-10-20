import type { Metadata } from "next";
import { CollectionCard } from "@/components/help/collection-card";
import { SiteHeader } from "@/components/help/site-header";
import { localePath, locales, type Alternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getCollections, getSiteSettings } from "@/lib/content";
import { absoluteUrl, JsonLd, pageMetadata } from "@/lib/seo";

const homeAlternates: Alternates = Object.fromEntries(locales.map((l) => [l, localePath(l)]));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);
  const t = getDictionary(locale);
  return pageMetadata({
    locale,
    title: `${t.homeTitle} | ${settings.title}`,
    absoluteTitle: true,
    description: settings.description,
    alternates: homeAlternates,
    siteName: settings.title,
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const [settings, collections] = await Promise.all([getSiteSettings(locale), getCollections(locale)]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: settings.title,
          url: absoluteUrl(localePath(locale)),
          inLanguage: locale,
          description: settings.description,
          publisher: { "@type": "Organization", name: "Inverso", url: settings.mainSiteUrl, logo: absoluteUrl("/brand/avatar.png") },
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: absoluteUrl(`${localePath(locale, "/search")}?q={search_term_string}`) },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <SiteHeader hero alternates={homeAlternates} />
      <main id="main" className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-8 sm:py-14">
        {collections.length === 0 ? (
          <div className="rounded-2xl border border-dashed px-6 py-16 text-center">
            <h2 className="text-lg font-semibold">{t.emptyHelpCenterTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.emptyHelpCenter}</p>
          </div>
        ) : (
          <>
            <h2 className="sr-only">{t.collections}</h2>
            <ul className="grid gap-3 sm:gap-4">
              {collections.map((c) => (
                <li key={c._id}>
                  <CollectionCard locale={locale} collection={c} />
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
}
