"use client";

import { ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Props = {
  title: string;
  menuLabel: string;
  homeHref: string;
  homeLabel: string;
  mainSiteUrl?: string;
  children: React.ReactNode;
};

export function MobileMenu({ title, menuLabel, homeHref, homeLabel, mainSiteUrl, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={menuLabel}
        className="grid size-10 place-items-center rounded-full text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:outline-none sm:hidden"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm border-white/10 bg-header p-6 text-white">
        <SheetTitle className="text-base font-semibold text-white">{title}</SheetTitle>
        <div className="mt-6 grid gap-8" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          <nav className="grid gap-1">
            <Link href={homeHref} className="rounded-lg px-3 py-2.5 text-base text-white/90 hover:bg-white/5">
              {homeLabel}
            </Link>
            {mainSiteUrl && (
              <a href={mainSiteUrl} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base text-white/90 hover:bg-white/5">
                Inverso.bg <ExternalLink className="size-4 text-white/50" />
              </a>
            )}
          </nav>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
