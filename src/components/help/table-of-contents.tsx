"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/portable-text";
import { cn } from "@/lib/utils";

export function TableOfContents({ entries, title }: { entries: TocEntry[]; title: string }) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (items) => {
        const visible = items.filter((i) => i.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label={title} className="text-sm">
      <p className="mb-3 font-semibold text-foreground">{title}</p>
      <ul className="space-y-0.5">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              onClick={() => setActiveId(e.id)}
              className={cn(
                "block border-l-2 py-1.5 leading-snug transition-colors",
                e.level === 3 ? "pl-6" : "pl-3",
                activeId === e.id
                  ? "border-foreground/60 text-foreground"
                  : "border-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
