import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Author } from "@/lib/types";

/** "От Inverso", "От Mira и още 1" */
export function authorsLabel(locale: Locale, authors: Author[]) {
  const t = getDictionary(locale);
  const [first, ...rest] = authors;
  if (!first) return null;
  return `${t.by} ${first.name}${rest.length > 0 ? t.andMore(rest.length) : ""}`;
}

export function ArticleAuthor({ locale, author, updatedAt }: { locale: Locale; author: Author; updatedAt: string }) {
  const t = getDictionary(locale);
  const date = formatDate(locale, updatedAt);
  return (
    <div className="flex items-center gap-3 pt-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={author.avatarUrl || "/brand/avatar.svg"}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-full bg-header object-cover"
      />
      <div className="flex flex-col">
        <span className="text-sm leading-5">
          {t.writtenBy} <strong className="font-semibold">{author.name}</strong>
        </span>
        {date && (
          <time dateTime={updatedAt} className="text-xs leading-4 text-muted-foreground">
            {date}
          </time>
        )}
      </div>
    </div>
  );
}

function formatDate(locale: Locale, iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return new Intl.DateTimeFormat(localeMeta[locale].intl, { day: "numeric", month: "long", year: "numeric" }).format(d);
}
