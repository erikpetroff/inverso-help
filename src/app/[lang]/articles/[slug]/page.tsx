import { ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArticleBody } from "@/components/help/article-body";
import { AuthorLine, formatUpdated } from "@/components/help/author-line";
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
import { absoluteUrl, breadcrumbJsonLd, JsonLd, pageMetadata } from "@/lib/seo";

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
    article.description || bodyToPlainText(article.body).replace(/\s+/g, " ").slice(0, 160) || settings.description;
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
  const updated = formatUpdated(locale, article.updatedAt);
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
            dateModified: article.updatedAt,
            author: { "@type": "Organization", name: article.author?.name ?? "Inverso" },
            publisher: { "@type": "Organization", name: "Inverso", logo: absoluteUrl("/brand/avatar.png") },
          },
        ]}
      />
      <SiteHeader alternates={article.alternates} />
      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-14">
          <article className="min-w-0 max-w-3xl">
            <HelpBreadcrumb
              locale={locale}
              items={[
                ...(article.collection && collectionPath ? [{ label: article.collection.title, href: collectionPath }] : []),
                { label: article.title },
              ]}
            />

            <header className="mt-6 border-b pb-6 sm:mt-8">
              <h1 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">{article.title}</h1>
              {article.description && (
                <p className="mt-3 text-base text-muted-foreground sm:text-lg">{article.description}</p>
              )}
              {article.author && (
                <AuthorLine locale={locale} authors={[article.author]} prefix="writtenBy" className="mt-5">
                  {updated && <span className="block text-xs text-muted-foreground">{updated}</span>}
                </AuthorLine>
              )}
            </header>

            {toc.length > 1 && (
              <details className="mt-6 rounded-xl border px-4 py-3 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold">{t.tableOfContents}</summary>
                <ul className="mt-2 space-y-1 text-sm">
                  {toc.map((e) => (
                    <li key={e.id} className={e.level === 3 ? "pl-4" : ""}>
                      <a href={`#${e.id}`} className="block py-1.5 text-muted-foreground hover:text-foreground">
                        {e.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <div className="mt-8">
              {article.body.length > 0 ? (
                <ArticleBody value={article.body} />
              ) : (
                <p className="text-muted-foreground">{t.noBody}</p>
              )}
            </div>

            <div className="mt-12 sm:mt-14">
              <Reactions articleId={article._id} locale={locale} />
            </div>

            {article.related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-lg font-semibold">{t.relatedArticles}</h2>
                <ul className="mt-4 divide-y overflow-hidden rounded-lg border border-foreground/15">
                  {article.related.map((r) => (
                    <li key={r._id}>
                      <Link
                        href={localePath(locale, `/articles/${r.slug}`)}
                        className="group flex items-center justify-between gap-4 px-4 py-3.5 text-sm transition hover:bg-primary/4 sm:px-5"
                      >
                        <span className="font-medium group-hover:text-primary">{r.title}</span>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {toc.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto pt-16">
                <TableOfContents entries={toc} title={t.tableOfContents} />
              </div>
            </aside>
          )}
        </div>
      </main>
    </>
  );
}

function FallbackShell() {
  return (
    <>
      <div className="h-36 bg-header" />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-12" aria-busy="true">
        <div className="max-w-3xl">
          <Skeleton className="h-4 w-64" />
          <Skeleton className="mt-8 h-9 w-3/4" />
          <Skeleton className="mt-4 h-5 w-1/2" />
          <div className="mt-10 space-y-3">
            {Array.from({ length: 8 }, (_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
