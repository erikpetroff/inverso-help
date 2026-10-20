import { CaretRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { authorsLabel } from "@/components/help/author-line";
import { HelpBreadcrumb } from "@/components/help/help-breadcrumb";
import { SiteHeader } from "@/components/help/site-header";
import { Skeleton } from "@/components/ui/skeleton";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getCollection, getSiteSettings, getStaticSlugs } from "@/lib/content";
import { CollectionIcon } from "@/lib/icons";
import { splitNumber } from "@/lib/portable-text";
import { absoluteUrl, breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

type Params = PageProps<"/[lang]/collections/[slug]">["params"];

export async function generateStaticParams() {
  const { collections } = await getStaticSlugs(await getLocale());
  return collections.length ? collections.map((slug) => ({ slug })) : [{ slug: "__empty__" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const [collection, settings] = await Promise.all([getCollection(locale, slug), getSiteSettings(locale)]);
  if (!collection) return { title: getDictionary(locale).notFound.metaTitle, robots: { index: false } };
  return pageMetadata({
    locale,
    title: collection.title,
    description: [
      collection.description,
      `${getDictionary(locale).articleCount(collection.articleCount)}: ${collection.articles.map((a) => splitNumber(a.title).text).join("; ")}`,
    ]
      .filter(Boolean)
      .join(" – "),
    alternates: collection.alternates,
    siteName: settings.title,
  });
}

export default async function CollectionPage({ params }: PageProps<"/[lang]/collections/[slug]">) {
  const locale = await getLocale();
  return (
    <Suspense fallback={<FallbackShell />}>
      <CollectionContent params={params} locale={locale} />
    </Suspense>
  );
}

async function CollectionContent({ params, locale }: { params: Params; locale: Locale }) {
  const { slug } = await params;
  const collection = await getCollection(locale, slug);
  if (!collection) notFound();
  const t = getDictionary(locale);
  const path = localePath(locale, `/collections/${collection.slug}`);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t.allCollections, path: localePath(locale) },
            { name: collection.title, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: collection.title,
            description: collection.description,
            url: absoluteUrl(path),
            inLanguage: locale,
            hasPart: collection.articles.map((a) => ({
              "@type": "Article",
              headline: a.title,
              url: absoluteUrl(localePath(locale, `/articles/${a.slug}`)),
            })),
          },
        ]}
      />
      <SiteHeader alternates={collection.alternates} />
      <main id="main" className="w-full flex-1 px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto flex max-w-[800px] flex-col gap-6">
          <HelpBreadcrumb locale={locale} items={[{ label: collection.title }]} />

          <div className="flex items-start gap-4 sm:gap-5">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-mint sm:size-14">
              <CollectionIcon name={collection.icon} className="size-6 sm:size-7" />
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.02em] sm:text-[32px] sm:leading-10">
                {collection.title}
              </h1>
              {collection.description && (
                <p className="text-base leading-6 text-muted-foreground">{collection.description}</p>
              )}
              <div className="flex items-center gap-2 text-xs leading-4 text-muted-foreground">
                <span>{authorsLabel(locale, collection.authors)}</span>
                <span aria-hidden className="size-[3px] rounded-full bg-faint" />
                <span>{t.articleCount(collection.articleCount)}</span>
              </div>
            </div>
          </div>

          <section aria-label={t.articles}>
            {collection.articles.length === 0 ? (
              <p className="rounded-2xl border bg-card px-6 py-10 text-center text-sm text-muted-foreground">
                {t.emptyCollection}
              </p>
            ) : (
              <ol className="overflow-hidden rounded-2xl border bg-card">
                {collection.articles.map((a, i) => {
                  const { number, text } = splitNumber(a.title);
                  return (
                    <li key={a._id} className="border-b border-black/6 last:border-b-0">
                      <Link
                        href={localePath(locale, `/articles/${a.slug}`)}
                        className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-black/3 focus-visible:bg-black/3 focus-visible:outline-none sm:px-6"
                      >
                        <span
                          aria-hidden
                          className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-xs font-semibold tabular-nums"
                        >
                          {number ?? i + 1}
                        </span>
                        <span className="flex-1 text-sm leading-5 font-medium text-pretty">{text}</span>
                        <CaretRight aria-hidden className="size-4 shrink-0 text-faint" />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

function FallbackShell() {
  return (
    <>
      <div className="h-[140px] bg-header" />
      <main className="w-full flex-1 px-4 pt-8 pb-20 sm:px-6" aria-busy="true">
        <div className="mx-auto flex max-w-[800px] flex-col gap-6">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-5">
            <Skeleton className="size-14 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </main>
    </>
  );
}
