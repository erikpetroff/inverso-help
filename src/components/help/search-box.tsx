"use client";

import { CaretRight, CircleNotch, FileText, MagnifyingGlass, X } from "@phosphor-icons/react";
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
  const dictionary = getDictionary(locale);
  const t = dictionary.search;
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
    <div ref={wrapperRef} className={cn("relative w-full max-w-[720px] text-foreground", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (active >= 0 && results[active]) {
            setOpen(false);
            router.push(localePath(locale, `/articles/${results[active].slug}`));
          } else submit();
        }}
        className={cn(
          "flex items-center gap-3 rounded-xl bg-card px-4 shadow-card focus-within:ring-3 focus-within:ring-brand-mint/60",
          size === "lg" ? "h-14" : "h-12",
        )}
      >
        <label className="sr-only" htmlFor={`${listId}-input`}>
          {t.label}
        </label>
        <MagnifyingGlass aria-hidden className="size-5 shrink-0 text-faint" />
        <input
          id={`${listId}-input`}
          type="search"
          autoComplete="off"
          enterKeyHint="search"
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
          className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-faint [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            aria-label={t.clear}
            onClick={() => {
              setValue("");
              setState({ status: "idle" });
            }}
            className="flex rounded-md p-1 text-faint hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {showPanel && (
        <div
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-card"
        >
          {state.status === "loading" && (
            <div className="flex items-center gap-2 px-6 py-4 text-sm text-muted-foreground">
              <CircleNotch className="size-4 animate-spin" /> {t.searching}
            </div>
          )}
          {state.status === "error" && <p className="px-6 py-4 text-sm text-destructive">{t.error}</p>}
          {state.status === "done" && results.length === 0 && (
            <p className="px-6 py-4 text-sm text-muted-foreground">
              {t.noResultsFor} <span className="font-medium text-foreground">{state.query}</span>
            </p>
          )}
          {state.status === "done" && results.length > 0 && (
            <>
              <div aria-hidden className="border-b px-6 py-4 text-xs leading-4 font-semibold text-muted-foreground">
                {dictionary.articles} · {results.length}
              </div>
              <ul role="none" className="max-h-[60vh] overflow-y-auto">
                {results.map((r, i) => (
                  <li key={r._id} role="option" aria-selected={i === active}>
                    <Link
                      href={localePath(locale, `/articles/${r.slug}`)}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActive(i)}
                      className={cn(
                        "flex items-center gap-4 border-b border-black/6 px-6 py-3.5",
                        i === active && "bg-black/3",
                      )}
                    >
                      <FileText className="size-5 shrink-0 text-faint" />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-sm leading-5 font-medium">{r.title}</span>
                        {r.collection && (
                          <span className="truncate text-xs leading-4 text-muted-foreground">{r.collection.title}</span>
                        )}
                      </span>
                      <CaretRight className="size-4 shrink-0 text-faint" />
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={submit}
                className="w-full px-6 py-3.5 text-left text-sm font-semibold hover:bg-black/3"
              >
                {t.seeAll(query)}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
