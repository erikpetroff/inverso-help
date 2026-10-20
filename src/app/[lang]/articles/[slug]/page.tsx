import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleBody } from "@/components/help/article-body";
import { ArticleAuthor } from "@/components/help/author-line";
import { HelpBreadcrumb } from "@/components/help/help-breadcrumb";
import { Reactions } from "@/components/help/reactions";
import { SiteHeader } from "@/components/help/site-header";
import { TableOfContents } from "@/components/help/table-of-contents";
import { Skeleton } from "@/components/ui/skeleton";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getArticle, getSiteSettings, getStaticSlugs } from "@/lib/content";
import { bodyToPlainText, tableOfContents } from "@/lib/portable-text";
import { absoluteUrl, breadcrumbJsonLd, JsonLd, pageMetadata, repeatsTitle } from "@/lib/seo";

type Params = PageProps<"/[lang]/articles/[slug]">["params"];

export async function generateStaticParams() {
  const { articles } = await getStaticSlugs(await getLocale());
  return articles.length ? articles.map((slug) => ({ slug })) : [{ slug: "__empty__" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/articles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const [article, settings] = await Promise.all([getArticle(locale, slug), getSiteSettings(locale)]);
  if (!article) return { title: getDictionary(locale).notFound.metaTitle, robots: { index: false } };
  const description =
    (article.description && !repeatsTitle(article.title, article.description) ? article.description : null) ||
    bodyToPlainText(article.body) ||
    settings.description;
  return pageMetadata({
    locale,
    title: article.seoTitle || article.title,
    description,
    alternates: article.alternates,
    siteName: settings.title,
    type: "article",
    publishedTime: article.updatedAt,
  });
}

export default async function ArticlePage({ params }: PageProps<"/[lang]/articles/[slug]">) {
  const locale = await getLocale();
  return (
    <Suspense fallback={<FallbackShell />}>
      <ArticleContent params={params} locale={locale} />
    </Suspense>
  );
}

async function ArticleContent({ params, locale }: { params: Params; locale: Locale }) {
  const { slug } = await params;
  const article = await getArticle(locale, slug);
  if (!article) notFound();
  const t = getDictionary(locale);
  const toc = tableOfContents(article.body);
  const lead = leadFor(article.title, article.description);
  const path = localePath(locale, `/articles/${article.slug}`);
  const collectionPath = article.collection && localePath(locale, `/collections/${article.collection.slug}`);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t.allCollections, path: localePath(locale) },
            ...(article.collection && collectionPath ? [{ name: article.collection.title, path: collectionPath }] : []),
            { name: article.title, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: article.title,
            description: article.description,
            inLanguage: locale,
            url: absoluteUrl(path),
            mainEntityOfPage: absoluteUrl(path),
            image: absoluteUrl(`${path}/opengraph-image`),
            datePublished: article.updatedAt,
            dateModified: article.updatedAt,
            author: { "@type": "Organization", name: article.author?.name ?? "Inverso" },
            publisher: { "@type": "Organization", name: "Inverso", logo: absoluteUrl("/brand/avatar.png") },
          },
        ]}
      />
      <SiteHeader alternates={article.alternates} />
      <main id="main" className="w-full flex-1 px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-6">
          <HelpBreadcrumb
            locale={locale}
            items={[
              ...(article.collection && collectionPath ? [{ label: article.collection.title, href: collectionPath }] : []),
              { label: article.title },
            ]}
          />

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
            <article className="flex min-w-0 flex-col gap-8 rounded-2xl border bg-card p-5 sm:p-10">
              <header className="flex flex-col gap-3">
                <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.02em] text-pretty sm:text-4xl sm:leading-[44px]">
                  {article.title}
                </h1>
                {lead && <p className="text-base leading-7 text-pretty text-muted-foreground sm:text-lg">{lead}</p>}
                {article.author && <ArticleAuthor locale={locale} author={article.author} updatedAt={article.updatedAt} />}
              </header>

              <div className="border-t pt-8">
                {article.body.length > 0 ? (
                  <ArticleBody value={article.body} />
                ) : (
                  <p className="text-muted-foreground">{t.noBody}</p>
                )}
              </div>

              <Reactions articleId={article._id} locale={locale} />

              {(article.previous || article.next) && (
                <nav aria-label={t.articles} className="flex flex-wrap gap-3">
                  {article.previous && (
                    <Link
                      href={localePath(locale, `/articles/${article.previous.slug}`)}
                      rel="prev"
                      className="flex min-w-0 flex-[1_1_220px] flex-col gap-1 rounded-xl border p-4 transition-colors hover:border-black/20"
                    >
                      <span className="flex items-center gap-1 text-xs leading-4 text-muted-foreground">
                        <ArrowLeft aria-hidden className="size-3" />
                        {t.previous}
                      </span>
                      <span className="text-sm leading-5 font-medium">{article.previous.title}</span>
                    </Link>
                  )}
                  {article.next && (
                    <Link
                      href={localePath(locale, `/articles/${article.next.slug}`)}
                      rel="next"
                      className="ml-auto flex min-w-0 flex-[1_1_220px] flex-col items-end gap-1 rounded-xl border p-4 text-right transition-colors hover:border-black/20"
                    >
                      <span className="flex items-center gap-1 text-xs leading-4 text-muted-foreground">
                        {t.next}
                        <ArrowRight aria-hidden className="size-3" />
                      </span>
                      <span className="text-sm leading-5 font-medium">{article.next.title}</span>
                    </Link>
                  )}
                </nav>
              )}
            </article>

            <aside className="flex min-w-0 flex-col gap-4 lg:sticky lg:top-6">
              {toc.length > 0 && <TableOfContents entries={toc} title={t.tableOfContents} />}
              {article.related.length > 0 && article.collection && (
                <nav aria-label={t.moreIn(article.collection.title)} className="flex flex-col gap-1 rounded-2xl border bg-card p-4">
                  <p className="px-2 pt-1 pb-2 text-xs leading-4 font-semibold text-muted-foreground">
                    {t.moreIn(article.collection.title)}
                  </p>
                  <ul className="flex flex-col gap-1">
                    {article.related.map((r) => (
                      <li key={r._id}>
                        <Link
                          href={localePath(locale, `/articles/${r.slug}`)}
                          className="block rounded-lg px-2 py-1.5 text-sm leading-5 text-pretty transition-colors hover:bg-accent"
                        >
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

/** The design shows the description as a lead, unless it only repeats the title. */
function leadFor(title: string, description?: string) {
  return description && !repeatsTitle(title, description) ? description : null;
}

function FallbackShell() {
  return (
    <>
      <div className="h-[140px] bg-header" />
      <main className="w-full flex-1 px-4 pt-8 pb-20 sm:px-6" aria-busy="true">
        <div className="mx-auto flex max-w-[1040px] flex-col gap-6">
          <Skeleton className="h-4 w-64" />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]">
            <div className="space-y-4 rounded-2xl border bg-card p-10">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              {Array.from({ length: 8 }, (_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </main>
    </>
  );
}
