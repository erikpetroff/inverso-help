import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, localePath } from "@/i18n/config";
import { resolveLegacyPath } from "@/lib/content";

// Reached via a rewrite in proxy.ts for old Intercom URLs such as /bg/articles/11018442-1-достъп-до-модула-фактури
export async function GET(request: NextRequest, { params }: RouteContext<"/api/legacy/[lang]/[kind]/[id]">) {
  const { lang, kind, id } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const target =
    kind === "articles" || kind === "collections" ? await resolveLegacyPath(kind, id, locale) : null;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  return Response.redirect(new URL(target ?? localePath(locale), `${proto}://${host}`), 308);
}
