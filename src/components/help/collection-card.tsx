import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CollectionIcon } from "@/lib/icons";
import type { CollectionSummary } from "@/lib/types";
import { authorsLabel } from "./author-line";

export function CollectionCard({ locale, collection }: { locale: Locale; collection: CollectionSummary }) {
  const t = getDictionary(locale);
  return (
    <Link
      href={localePath(locale, `/collections/${collection.slug}`)}
      className="flex h-full flex-col gap-4 rounded-2xl border bg-card p-6 transition-[box-shadow,border-color] duration-150 ease-standard hover:border-black/20 hover:shadow-card focus-visible:ring-3 focus-visible:ring-brand-mint focus-visible:outline-none"
    >
      <div className="grid size-10 place-items-center rounded-[10px] bg-brand-mint">
        <CollectionIcon name={collection.icon} className="size-5" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h2 className="text-base leading-6 font-semibold">{collection.title}</h2>
        {collection.description && (
          <p className="text-sm leading-5 text-pretty text-muted-foreground">{collection.description}</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-2 text-xs leading-4 text-muted-foreground">
        <span>{authorsLabel(locale, collection.authors)}</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-foreground">{t.articleCount(collection.articleCount)}</span>
      </div>
    </Link>
  );
}
