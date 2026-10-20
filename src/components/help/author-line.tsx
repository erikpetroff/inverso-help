import { localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Author } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  authors: Author[];
  prefix?: "by" | "writtenBy";
  children?: React.ReactNode;
  className?: string;
};

export function AuthorLine({ locale, authors, prefix = "by", children, className }: Props) {
  const t = getDictionary(locale);
  const [first, ...rest] = authors;
  return (
    <div className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", className)}>
      <span className="flex shrink-0 -space-x-2">
        {authors.slice(0, 3).map((a) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={a.name}
            src={a.avatarUrl || "/brand/avatar.png"}
            alt=""
            width={28}
            height={28}
            className="size-7 rounded-full border-2 border-background bg-muted object-cover"
          />
        ))}
      </span>
      <span className="min-w-0">
        {first && (
          <>
            {t[prefix]} <span className="font-medium text-foreground">{first.name}</span>
            {rest.length > 0 && t.andMore(rest.length)}
          </>
        )}
        {children}
      </span>
    </div>
  );
}

export function formatUpdated(locale: Locale, iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const date = new Intl.DateTimeFormat(localeMeta[locale].intl, { day: "numeric", month: "long", year: "numeric" }).format(d);
  return getDictionary(locale).updatedOn(date);
}
