import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { localePath, type Alternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { getSiteSettings } from "@/lib/content";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
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
  const home = localePath(locale);

  return (
    <header className="bg-header text-white">
      <div className={cn("mx-auto max-w-5xl px-5 sm:px-8", hero ? "pt-5 pb-12 sm:pt-6 sm:pb-20" : "py-4 sm:pt-5 sm:pb-8")}>
        <div className="flex items-center justify-between gap-4">
          <Link
            href={home}
            className="flex min-w-0 items-center gap-3 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-mint"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={settings.logoUrl || "/brand/logo.png"} alt="" width={36} height={36} className="size-9 shrink-0" />
            <span className="truncate text-base font-semibold tracking-tight sm:text-lg">{settings.title}</span>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <LanguageSwitcher locale={locale} alternates={alternates} label={t.language} />
            {settings.mainSiteUrl && (
              <a
                href={settings.mainSiteUrl}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {t.toMainSite} Inverso.bg
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>

          <MobileMenu
            title={settings.title}
            menuLabel={t.menu}
            homeHref={home}
            homeLabel={t.allCollections}
            mainSiteUrl={settings.mainSiteUrl}
          >
            <LanguageSwitcher locale={locale} alternates={alternates} label={t.language} variant="list" />
          </MobileMenu>
        </div>

        {hero ? (
          <div className="mt-10 sm:mt-16">
            <h1 className="max-w-3xl text-[1.75rem] leading-tight font-bold tracking-tight text-balance sm:text-4xl">
              {settings.headline}
            </h1>
            <SearchBox
              className="mt-7 sm:mt-8"
              locale={locale}
              placeholder={settings.searchPlaceholder}
              defaultValue={searchDefault}
            />
          </div>
        ) : (
          <SearchBox
            className="mt-4 sm:mt-5"
            size="md"
            locale={locale}
            placeholder={settings.searchPlaceholder}
            defaultValue={searchDefault}
          />
        )}
      </div>
    </header>
  );
}
