import type { NextRequest } from "next/server";
import { resolveLegacyPath } from "@/lib/content";

// Reached via a rewrite in proxy.ts for old Intercom URLs such as /bg/articles/11018442-1-достъп-до-модула-фактури
export async function GET(request: NextRequest, { params }: RouteContext<"/api/legacy/[kind]/[id]">) {
  const { kind, id } = await params;
  const target =
    kind === "articles" || kind === "collections" ? await resolveLegacyPath(kind, id) : null;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  return Response.redirect(new URL(target ?? "/bg", `${proto}://${host}`), 308);
}
