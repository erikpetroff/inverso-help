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

export type TocEntry = { id: string; text: string; level: 2 | 3 };

export function tableOfContents(body: ArticleBody | undefined): TocEntry[] {
  return (body ?? []).flatMap((block) => {
    const b = block as PortableTextBlock;
    if (b._type !== "block" || (b.style !== "h2" && b.style !== "h3")) return [];
    const text = blockText(b).trim();
    if (!text) return [];
    return [{ id: headingId(b), text, level: b.style === "h2" ? 2 : 3 }];
  });
}
