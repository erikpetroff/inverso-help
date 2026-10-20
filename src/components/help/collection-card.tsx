import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CollectionIcon } from "@/lib/icons";
import type { CollectionSummary } from "@/lib/types";
import { AuthorLine } from "./author-line";

export function CollectionCard({ locale, collection }: { locale: Locale; collection: CollectionSummary }) {
  const t = getDictionary(locale);
  return (
    <Link
      href={localePath(locale, `/collections/${collection.slug}`)}
      className="group flex items-center gap-4 rounded-lg border border-foreground/15 bg-card p-4 shadow-xs transition hover:border-primary/40 hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:gap-6 sm:p-6"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/8 text-primary sm:size-14">
        <CollectionIcon name={collection.icon} className="size-5 sm:size-7" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
          {collection.title}
        </span>
        {collection.description && (
          <span className="mt-1 block text-sm text-muted-foreground">{collection.description}</span>
        )}
        {collection.articleCount > 0 && (
          <AuthorLine locale={locale} authors={collection.authors} className="mt-3 text-xs sm:text-sm">
            <span className="mx-1.5 text-muted-foreground/60">·</span>
            {t.articleCount(collection.articleCount)}
          </AuthorLine>
        )}
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}
