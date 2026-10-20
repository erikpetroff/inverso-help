import { CaretRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Fragment } from "react";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Crumb = { label: string; href?: string };

export function HelpBreadcrumb({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const t = getDictionary(locale);
  const all: Crumb[] = [{ label: t.allCollections, href: localePath(locale) }, ...items];
  return (
    <nav aria-label={t.breadcrumb}>
      <ol className="flex flex-wrap items-center gap-2 text-sm leading-5 text-muted-foreground">
        {all.map((c, i) => (
          <Fragment key={`${c.label}-${i}`}>
            {i > 0 && (
              <li aria-hidden className="flex">
                <CaretRight className="size-3" />
              </li>
            )}
            <li className="min-w-0">
              {c.href ? (
                <Link href={c.href} className="hover:text-foreground hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="line-clamp-1 text-foreground">
                  {c.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
