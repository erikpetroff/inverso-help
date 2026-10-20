import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getSiteSettings } from "@/lib/content";

export async function SiteFooter() {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);

  return (
    <footer className="mt-auto border-t bg-card py-8">
      <div className="mx-auto flex max-w-[1088px] flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={localePath(locale)} className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/inverso-logo.svg" alt={settings.title} width={94} height={22} className="h-[22px] w-auto" />
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <Link href={localePath(locale)} className="hover:text-foreground hover:underline">
            {settings.title}
          </Link>
          {settings.footerText &&
            (settings.mainSiteUrl ? (
              <a href={settings.mainSiteUrl} className="hover:text-foreground hover:underline">
                {settings.footerText}
              </a>
            ) : (
              <span>{settings.footerText}</span>
            ))}
        </div>
      </div>
    </footer>
  );
}
