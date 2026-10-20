"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/portable-text";
import { cn } from "@/lib/utils";

export function TableOfContents({ entries, title }: { entries: TocEntry[]; title: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

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
    <nav aria-label={title} className="flex flex-col gap-1 rounded-2xl border bg-card p-4">
      <p className="px-2 pt-1 pb-2 text-xs leading-4 font-semibold text-muted-foreground">{title}</p>
      <ul className="flex flex-col gap-1">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              onClick={() => setActiveId(e.id)}
              aria-current={activeId === e.id ? "location" : undefined}
              className={cn(
                "flex gap-2 rounded-lg px-2 py-1.5 text-sm leading-5 transition-colors hover:bg-accent",
                e.level === 3 && !e.number && "pl-5",
                activeId === e.id && "bg-accent font-medium",
              )}
            >
              {e.number && <span className="shrink-0 text-faint tabular-nums">{e.number}</span>}
              <span>{e.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
