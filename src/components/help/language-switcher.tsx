"use client";

import { CaretDown, Check } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { localeMeta, localePath, locales, type Alternates, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const FLAGS: Record<Locale, string> = { bg: "/flags/bg.svg", en: "/flags/gb.svg" };

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={FLAGS[locale]}
      alt=""
      width={20}
      height={14}
      className={cn("h-3.5 w-5 shrink-0 rounded-[2px] object-cover", className)}
    />
  );
}

/** Links to the current page in every language; falls back to that language's homepage when untranslated. */
export function LanguageSwitcher({ locale, alternates, label }: { locale: Locale; alternates: Alternates; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={`${label}: ${localeMeta[locale].label}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-2 text-sm text-white transition-colors hover:bg-white/8 focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:outline-none"
      >
        <Flag locale={locale} className="shadow-[0_0_0_1px_rgb(255_255_255/0.2)]" />
        <span>{localeMeta[locale].label}</span>
        <CaretDown aria-hidden className="size-3" />
      </button>
      {open && (
        <ul
          id={menuId}
          className="absolute top-[calc(100%+8px)] right-0 z-40 flex min-w-[180px] flex-col rounded-xl border bg-popover p-1 text-popover-foreground shadow-card"
        >
          {locales.map((l) => (
            <li key={l}>
              <Link
                href={alternates[l] ?? localePath(l)}
                hrefLang={localeMeta[l].hreflang}
                lang={localeMeta[l].hreflang}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm leading-5 hover:bg-accent"
              >
                <span className="flex items-center gap-2.5">
                  <Flag locale={l} className="shadow-[0_0_0_1px_rgb(0_0_0/0.1)]" />
                  {localeMeta[l].label}
                </span>
                {l === locale && <Check aria-hidden className="size-4" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
