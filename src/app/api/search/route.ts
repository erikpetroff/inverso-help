import type { NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";
import { searchArticles } from "@/lib/content";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const lang = params.get("lang");
  const locale = isLocale(lang) ? lang : defaultLocale;
  const q = params.get("q")?.trim().slice(0, 200) ?? "";
  const results = q.length >= 2 ? await searchArticles(locale, q) : [];
  return Response.json({ results });
}
