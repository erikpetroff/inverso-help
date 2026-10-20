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
      <main id="main" className="mx-auto w-full max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{t.body}</p>
        <Button className="mt-8" size="lg" render={<Link href={localePath(locale)} />} nativeButton={false}>
          {t.cta}
        </Button>
      </main>
    </>
  );
}
