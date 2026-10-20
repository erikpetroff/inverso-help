import Link from "next/link";
import { localePath, type Alternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getSiteSettings } from "@/lib/content";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { SearchBox } from "./search-box";

type Props = {
  hero?: boolean;
  searchDefault?: string;
  /** Equivalent URLs of the current page in each language, for the language switcher. */
  alternates?: Alternates;
};

export async function SiteHeader({ hero = false, searchDefault, alternates = {} }: Props) {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const settings = await getSiteSettings(locale);

  return (
    <header className="bg-header text-white">
      <div
        className={cn(
          "mx-auto flex max-w-[1088px] flex-col px-4 sm:px-6",
          hero ? "gap-10 pt-6 pb-16 sm:gap-14" : "gap-5 py-5",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href={localePath(locale)}
            className="flex shrink-0 rounded-md focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:outline-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={settings.logoUrl || "/brand/inverso-logo-white.svg"}
              alt={settings.title}
              width={120}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2">
            {settings.mainSiteUrl && (
              <a
                href={settings.mainSiteUrl}
                className="hidden rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/8 hover:text-white sm:block"
              >
                {t.toMainSite}
              </a>
            )}
            <LanguageSwitcher locale={locale} alternates={alternates} label={t.language} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {hero && (
            <h1 className="max-w-[640px] text-[28px] leading-9 font-semibold tracking-[-0.02em] text-pretty sm:text-[32px] sm:leading-10">
              {settings.headline}
            </h1>
          )}
          <SearchBox
            locale={locale}
            size={hero ? "lg" : "md"}
            placeholder={settings.searchPlaceholder}
            defaultValue={searchDefault}
          />
        </div>
      </div>
    </header>
  );
}
