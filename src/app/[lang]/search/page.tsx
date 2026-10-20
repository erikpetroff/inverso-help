import { FileText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { HelpBreadcrumb } from "@/components/help/help-breadcrumb";
import { SiteHeader } from "@/components/help/site-header";
import { Skeleton } from "@/components/ui/skeleton";
import { localePath, locales, type Alternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getSiteSettings, searchArticles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type SearchParams = PageProps<"/[lang]/search">["searchParams"];

const searchAlternates: Alternates = Object.fromEntries(locales.map((l) => [l, localePath(l, "/search")]));

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);
  return pageMetadata({
    locale,
    title: getDictionary(locale).search.pageTitle,
    alternates: searchAlternates,
    siteName: settings.title,
    noindex: true,
  });
}

async function readQuery(searchParams: SearchParams) {
  const { q } = await searchParams;
  return (Array.isArray(q) ? q[0] : q)?.trim() ?? "";
}

function withQuery(q: string): Alternates {
  if (!q) return searchAlternates;
  return Object.fromEntries(Object.entries(searchAlternates).map(([l, p]) => [l, `${p}?q=${encodeURIComponent(q)}`]));
}

export default async function SearchPage({ searchParams }: PageProps<"/[lang]/search">) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  return (
    <>
      <Suspense fallback={<SiteHeader alternates={searchAlternates} />}>
        <HeaderWithQuery searchParams={searchParams} />
      </Suspense>
      <main id="main" className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-12">
        <HelpBreadcrumb locale={locale} items={[{ label: t.search.pageTitle }]} />
        <Suspense fallback={<ResultsSkeleton label={t.loading} />}>
          <Results searchParams={searchParams} locale={locale} />
        </Suspense>
      </main>
    </>
  );
}

async function HeaderWithQuery({ searchParams }: { searchParams: SearchParams }) {
  const q = await readQuery(searchParams);
  return <SiteHeader searchDefault={q} alternates={withQuery(q)} />;
}

async function Results({ searchParams, locale }: { searchParams: SearchParams; locale: Locale }) {
  const q = await readQuery(searchParams);
  const t = getDictionary(locale).search;

  if (!q) return <p className="mt-10 text-muted-foreground">{t.emptyPrompt}</p>;

  const results = await searchArticles(locale, q);

  if (results.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed px-5 py-12 text-center sm:mt-10 sm:px-6 sm:py-14">
        <p className="text-lg font-semibold">
          {t.noResultsFor} <span className="break-words text-primary">{t.quote(q)}</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {t.tryAnother}{" "}
          <Link href={localePath(locale)} className="font-medium text-primary underline underline-offset-4">
            {t.browseAll}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <section className="mt-6 sm:mt-8">
      <h1 className="text-xl font-semibold sm:text-2xl">
        {t.resultsFor} <span className="break-words text-primary">{t.quote(q)}</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">{t.resultCount(results.length)}</p>
      <ul className="mt-6 space-y-3">
        {results.map((r) => (
          <li key={r._id}>
            <Link
              href={localePath(locale, `/articles/${r.slug}`)}
              className="group flex gap-3 rounded-lg border border-foreground/15 p-4 transition hover:border-primary/40 hover:shadow-md sm:gap-4 sm:p-5"
            >
              <FileText className="mt-0.5 size-5 shrink-0 text-primary" />
              <span className="min-w-0">
                <span className="block font-semibold group-hover:text-primary">{r.title}</span>
                {r.collection && <span className="mt-0.5 block text-xs text-muted-foreground">{r.collection.title}</span>}
                {(r.excerpt || r.description) && (
                  <span className="mt-2 line-clamp-3 block text-sm text-muted-foreground sm:line-clamp-2">
                    {r.excerpt || r.description}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResultsSkeleton({ label }: { label: string }) {
  return (
    <div className="mt-8 space-y-3" aria-busy="true" aria-label={label}>
      <Skeleton className="h-7 w-72 max-w-full" />
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </div>
  );
}
