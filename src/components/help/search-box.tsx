"use client";

import { FileText, Loader2, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { SearchResult } from "@/lib/types";

type Props = {
  locale: Locale;
  placeholder?: string;
  defaultValue?: string;
  size?: "lg" | "md";
  className?: string;
};

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "done"; query: string; results: SearchResult[] }
  | { status: "error" };

export function SearchBox({ locale, placeholder, defaultValue = "", size = "lg", className }: Props) {
  const t = getDictionary(locale).search;
  const router = useRouter();
  const listId = useId();
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [state, setState] = useState<State>({ status: "idle" });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const query = value.trim();

  useEffect(() => {
    if (query.length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setState({ status: "loading" });
      try {
        const res = await fetch(`/api/search?lang=${locale}&q=${encodeURIComponent(query)}`, { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { results: SearchResult[] };
        setState({ status: "done", query, results: data.results.slice(0, 6) });
        setActive(-1);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setState({ status: "error" });
      }
    }, 180);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, locale]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const results = state.status === "done" ? state.results : [];
  const showPanel = open && query.length >= 2 && state.status !== "idle";

  function submit() {
    if (!query) return;
    setOpen(false);
    router.push(`${localePath(locale, "/search")}?q=${encodeURIComponent(query)}`);
  }

  return (
    <div ref={wrapperRef} className={cn("relative w-full", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (active >= 0 && results[active]) {
            setOpen(false);
            router.push(localePath(locale, `/articles/${results[active].slug}`));
          } else submit();
        }}
      >
        <label className="sr-only" htmlFor={`${listId}-input`}>
          {t.label}
        </label>
        <Search
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
            size === "lg" ? "left-5 size-5" : "left-4 size-4",
          )}
        />
        <input
          id={`${listId}-input`}
          type="search"
          autoComplete="off"
          value={value}
          placeholder={placeholder || t.placeholder}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            if (e.target.value.trim().length < 2) setState({ status: "idle" });
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => Math.max(i - 1, -1));
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className={cn(
            "w-full rounded-[20px] border border-transparent bg-white text-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus-visible:ring-4 focus-visible:ring-brand-mint/50 [&::-webkit-search-cancel-button]:hidden",
            size === "lg" ? "h-14 pr-12 pl-13 text-base" : "h-11 pr-10 pl-11 text-sm",
          )}
        />
        {value && (
          <button
            type="button"
            aria-label={t.clear}
            onClick={() => {
              setValue("");
              setState({ status: "idle" });
            }}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xl"
        >
          {state.status === "loading" && (
            <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> {t.searching}
            </div>
          )}
          {state.status === "error" && (
            <p className="px-4 py-4 text-sm text-destructive">{t.error}</p>
          )}
          {state.status === "done" && results.length === 0 && (
            <p className="px-4 py-4 text-sm text-muted-foreground">
              {t.noResultsFor} <span className="font-medium text-foreground">{state.query}</span>
            </p>
          )}
          {state.status === "done" && results.length > 0 && (
            <ul className="max-h-[60vh] overflow-y-auto py-1">
              {results.map((r, i) => (
                <li key={r._id} role="option" aria-selected={i === active}>
                  <Link
                    href={localePath(locale, `/articles/${r.slug}`)}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setActive(i)}
                    className={cn("flex gap-3 px-4 py-3 text-left", i === active && "bg-muted")}
                  >
                    <FileText className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{r.title}</span>
                      {r.collection && (
                        <span className="block truncate text-xs text-muted-foreground">{r.collection.title}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={submit}
                  className="w-full border-t px-4 py-3 text-left text-sm font-medium text-primary hover:bg-muted"
                >
                  {t.seeAll(query)}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
