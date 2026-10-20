import { Globe } from "lucide-react";
import Link from "next/link";
import { localeMeta, localePath, locales, type Alternates, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type Props = {
  locale: Locale;
  alternates: Alternates;
  label: string;
  variant?: "pill" | "list";
};

/** Links to the current page in every language; falls back to that language's homepage when untranslated. */
export function LanguageSwitcher({ locale, alternates, label, variant = "pill" }: Props) {
  const items = locales.map((l) => ({ locale: l, href: alternates[l] ?? localePath(l), ...localeMeta[l] }));

  if (variant === "list") {
    return (
      <nav aria-label={label}>
        <p className="mb-2 text-xs font-medium tracking-wide text-white/50 uppercase">{label}</p>
        <ul className="grid gap-1">
          {items.map((item) => (
            <li key={item.locale}>
              <Link
                href={item.href}
                hrefLang={item.hreflang}
                lang={item.hreflang}
                aria-current={item.locale === locale ? "true" : undefined}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2.5 text-base transition",
                  item.locale === locale ? "bg-white/10 font-semibold text-white" : "text-white/75 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
                <span className="text-xs text-white/50">{item.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label={label} className="flex items-center gap-1 rounded-full bg-white/10 p-1 text-sm">
      <Globe aria-hidden className="mx-1.5 size-4 text-white/60" />
      {items.map((item) => (
        <Link
          key={item.locale}
          href={item.href}
          hrefLang={item.hreflang}
          lang={item.hreflang}
          title={item.label}
          aria-current={item.locale === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 font-medium transition",
            item.locale === locale ? "bg-white text-black" : "text-white/75 hover:text-white",
          )}
        >
          {item.short}
        </Link>
      ))}
    </nav>
  );
}
