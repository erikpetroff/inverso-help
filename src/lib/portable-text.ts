import type { PortableTextBlock } from "@portabletext/types";
import type { ArticleBody } from "./types";

type Span = { _type: string; text?: string };

export function blockText(block: unknown): string {
  const b = block as PortableTextBlock;
  if (b?._type !== "block" || !Array.isArray(b.children)) return "";
  return (b.children as Span[]).map((c) => c.text ?? "").join("");
}

export function bodyToPlainText(body: ArticleBody | undefined): string {
  return (body ?? []).map(blockText).filter(Boolean).join("\n");
}

export function headingId(block: PortableTextBlock): string {
  return `h_${block._key}`;
}

/** Splits a leading outline number off a title: "2.3 Добавяне на услуги" -> { number: "2.3", text: "Добавяне на услуги" }. */
export function splitNumber(title: string): { number?: string; text: string } {
  const match = title.trim().match(/^(\d{1,3}(?:\.\d{1,3})*)\.?\s+(\S[\s\S]*)$/);
  return match ? { number: match[1], text: match[2] } : { text: title.trim() };
}

export type TocEntry = { id: string; text: string; number?: string; level: 2 | 3 };

export function tableOfContents(body: ArticleBody | undefined): TocEntry[] {
  return (body ?? []).flatMap((block) => {
    const b = block as PortableTextBlock;
    if (b._type !== "block" || (b.style !== "h2" && b.style !== "h3")) return [];
    const title = blockText(b).trim();
    if (!title) return [];
    return [{ id: headingId(b), ...splitNumber(title), level: b.style === "h2" ? 2 : 3 }];
  });
}
