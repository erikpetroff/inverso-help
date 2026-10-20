"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { id: "disappointed", emoji: "😞" },
  { id: "neutral", emoji: "😐" },
  { id: "smiley", emoji: "😃" },
] as const;

const EVENT = "help-reaction-change";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function Reactions({ articleId, locale }: { articleId: string; locale: Locale }) {
  const t = getDictionary(locale).reactions;
  const storageKey = `help-reaction:${articleId}`;
  const selected = useSyncExternalStore(
    subscribe,
    () => window.localStorage.getItem(storageKey),
    () => null,
  );

  function choose(id: string) {
    window.localStorage.setItem(storageKey, id);
    window.dispatchEvent(new Event(EVENT));
  }

  return (
    <section className="rounded-2xl bg-muted/60 px-6 py-6 text-center">
      <p className="font-medium">{selected ? t.thanks : t.question}</p>
      <div className="mt-3 flex justify-center gap-3">
        {REACTIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            title={t[r.id]}
            aria-label={t[r.id]}
            aria-pressed={selected === r.id}
            onClick={() => choose(r.id)}
            className={cn(
              "grid size-12 place-items-center rounded-full text-2xl transition hover:scale-115",
              selected === r.id ? "scale-115 bg-background shadow" : selected ? "opacity-40 grayscale" : "",
            )}
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </section>
  );
}
