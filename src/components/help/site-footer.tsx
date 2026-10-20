import Link from "next/link";
import { localePath } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { getSiteSettings } from "@/lib/content";

export async function SiteFooter() {
  const locale = await getLocale();
  const settings = await getSiteSettings(locale);

  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-12 text-center sm:px-8">
        <Link href={localePath(locale)} className="grayscale transition hover:grayscale-0" aria-label={settings.title}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/avatar.png" alt="" width={40} height={40} className="size-10 rounded-full" />
        </Link>
        <p className="text-sm font-medium text-[#909aa5]">{settings.footerText || settings.title}</p>
        {settings.mainSiteUrl && (
          <a href={settings.mainSiteUrl} className="text-sm text-[#909aa5] underline-offset-4 hover:text-foreground hover:underline">
            {settings.mainSiteUrl.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>
    </footer>
  );
}
