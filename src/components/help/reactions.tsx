"use client";

import { Smiley, SmileyMeh, SmileySad } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

const REACTIONS = [
  { id: "disappointed", icon: SmileySad },
  { id: "neutral", icon: SmileyMeh },
  { id: "smiley", icon: Smiley },
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
    <section className="flex flex-col items-center gap-4 rounded-2xl bg-background p-6">
      <p className="text-sm leading-5 font-semibold" aria-live="polite">
        {selected ? t.thanks : t.question}
      </p>
      <div className="flex gap-2">
        {REACTIONS.map(({ id, icon: Icon }) => (
          <button
            key={id}
            type="button"
            title={t[id]}
            aria-label={t[id]}
            aria-pressed={selected === id}
            onClick={() => choose(id)}
            className={cn(
              "grid size-12 place-items-center rounded-full border transition-colors",
              selected === id ? "border-brand-mint bg-brand-mint" : "bg-card hover:bg-accent",
            )}
          >
            <Icon className="size-6" />
          </button>
        ))}
      </div>
    </section>
  );
}
