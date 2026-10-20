"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { lang } = useParams<{ lang: string }>();
  const locale = isLocale(lang) ? lang : defaultLocale;
  const t = getDictionary(locale).error;
  return (
    <main id="main" className="mx-auto w-full max-w-[800px] flex-1 px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em]">{t.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{t.body}</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button size="lg" onClick={reset}>
          {t.retry}
        </Button>
        <Button size="lg" variant="outline" render={<Link href={localePath(locale)} />} nativeButton={false}>
          {t.home}
        </Button>
      </div>
    </main>
  );
}
