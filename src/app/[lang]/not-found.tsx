import Link from "next/link";
import { SiteHeader } from "@/components/help/site-header";
import { Button } from "@/components/ui/button";
import { localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getDictionary(locale).notFound;
  return (
    <>
      <SiteHeader />
      <main id="main" className="w-full flex-1 px-4 pt-8 pb-20 sm:px-6">
        <div className="mx-auto flex max-w-[800px] flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-14 text-center">
          <h1 className="text-2xl leading-8 font-semibold tracking-[-0.02em]">{t.title}</h1>
          <p className="max-w-md text-muted-foreground">{t.body}</p>
          <Button className="mt-4" size="lg" render={<Link href={localePath(locale)} />} nativeButton={false}>
            {t.cta}
          </Button>
        </div>
      </main>
    </>
  );
}
