import { CaretRight, FileText, MagnifyingGlass } from "@phosphor-icons/react/ssr";
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
      <main id="main" className="w-full flex-1 px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto flex max-w-[800px] flex-col gap-6">
          <HelpBreadcrumb locale={locale} items={[{ label: t.search.pageTitle }]} />
          <Suspense fallback={<ResultsSkeleton label={t.loading} />}>
            <Results searchParams={searchParams} locale={locale} />
          </Suspense>
        </div>
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

  if (!q) return <p className="text-muted-foreground">{t.emptyPrompt}</p>;

  const results = await searchArticles(locale, q);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border bg-card px-6 py-12 text-center">
        <MagnifyingGlass aria-hidden className="size-8 text-faint" />
        <h1 className="text-base font-semibold">
          {t.noResultsFor} <span className="break-words">{t.quote(q)}</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.tryAnother}{" "}
          <Link href={localePath(locale)} className="font-medium text-foreground underline underline-offset-4">
            {t.browseAll}
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl leading-8 font-semibold tracking-[-0.02em]">
          {t.resultsFor} <span className="break-words">{t.quote(q)}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.resultCount(results.length)}</p>
      </div>
      <ul className="overflow-hidden rounded-2xl border bg-card">
        {results.map((r) => (
          <li key={r._id} className="border-b border-black/6 last:border-b-0">
            <Link
              href={localePath(locale, `/articles/${r.slug}`)}
              className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-black/3 sm:px-6"
            >
              <FileText aria-hidden className="size-5 shrink-0 self-start text-faint" />
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-sm leading-5 font-medium">{r.title}</span>
                {r.collection && <span className="text-xs leading-4 text-muted-foreground">{r.collection.title}</span>}
                {(r.excerpt || r.description) && (
                  <span className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">{r.excerpt || r.description}</span>
                )}
              </span>
              <CaretRight aria-hidden className="size-4 shrink-0 text-faint" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResultsSkeleton({ label }: { label: string }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label={label}>
      <Skeleton className="h-8 w-72 max-w-full" />
      <Skeleton className="h-80 w-full rounded-2xl" />
    </div>
  );
}
