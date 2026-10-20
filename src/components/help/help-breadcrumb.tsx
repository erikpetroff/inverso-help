import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Crumb = { label: string; href?: string };

export function HelpBreadcrumb({ locale, items }: { locale: Locale; items: Crumb[] }) {
  const t = getDictionary(locale);
  const all: Crumb[] = [{ label: t.allCollections, href: localePath(locale) }, ...items];
  return (
    <Breadcrumb aria-label={t.breadcrumb}>
      <BreadcrumbList>
        {all.map((c, i) => (
          <Fragment key={`${c.label}-${i}`}>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem className="min-w-0">
              {c.href ? (
                <BreadcrumbLink render={<Link href={c.href} />} className="truncate">
                  {c.label}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="line-clamp-1">{c.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
