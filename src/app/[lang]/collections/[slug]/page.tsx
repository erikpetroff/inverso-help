import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AuthorLine } from "@/components/help/author-line";
import { HelpBreadcrumb } from "@/components/help/help-breadcrumb";
import { SiteHeader } from "@/components/help/site-header";
import { Skeleton } from "@/components/ui/skeleton";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getCollection, getSiteSettings, getStaticSlugs } from "@/lib/content";
import { CollectionIcon } from "@/lib/icons";
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
    description: collection.description || settings.description,
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
      <main id="main" className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-12">
        <HelpBreadcrumb locale={locale} items={[{ label: collection.title }]} />

        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-start sm:gap-6">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary/8 text-primary sm:size-16">
            <CollectionIcon name={collection.icon} className="size-7 sm:size-8" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{collection.title}</h1>
            {collection.description && <p className="mt-2 text-muted-foreground">{collection.description}</p>}
            <AuthorLine locale={locale} authors={collection.authors} className="mt-4">
              <span className="mx-1.5 text-muted-foreground/60">·</span>
              {t.articleCount(collection.articleCount)}
            </AuthorLine>
          </div>
        </div>

        <section className="mt-8 sm:mt-10">
          <h2 className="sr-only">{t.articles}</h2>
          {collection.articles.length === 0 ? (
            <p className="rounded-xl border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
              {t.emptyCollection}
            </p>
          ) : (
            <ul className="divide-y overflow-hidden rounded-lg border border-foreground/15 bg-card shadow-xs">
              {collection.articles.map((a) => (
                <li key={a._id}>
                  <Link
                    href={localePath(locale, `/articles/${a.slug}`)}
                    className="group flex items-center justify-between gap-4 px-4 py-4 transition hover:bg-primary/4 focus-visible:bg-primary/4 focus-visible:outline-none sm:px-6"
                  >
                    <span className="min-w-0">
                      <span className="block font-medium text-foreground group-hover:text-primary">{a.title}</span>
                      {a.description && (
                        <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground sm:line-clamp-1">
                          {a.description}
                        </span>
                      )}
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function FallbackShell() {
  return (
    <>
      <div className="h-36 bg-header" />
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-12" aria-busy="true">
        <Skeleton className="h-4 w-48" />
        <div className="mt-8 flex gap-6">
          <Skeleton className="size-16 rounded-2xl" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <div className="mt-10 space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </main>
    </>
  );
}
