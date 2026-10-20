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
      <main id="main" className="mx-auto -mt-8 w-full max-w-[1088px] flex-1 px-4 pb-20 sm:px-6">
        {collections.length === 0 ? (
          <div className="rounded-2xl border bg-card px-6 py-12 text-center">
            <h2 className="text-base font-semibold">{t.emptyHelpCenterTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.emptyHelpCenter}</p>
          </div>
        ) : (
          <section aria-label={t.collections}>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
              {collections.map((c) => (
                <li key={c._id}>
                  <CollectionCard locale={locale} collection={c} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
