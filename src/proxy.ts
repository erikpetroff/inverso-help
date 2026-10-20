import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

// Intercom article/collection ids are 7+ digits: /bg/articles/11018442-1-достъп-до-модула-фактури
const LEGACY = /^\/bg\/(articles|collections)\/(\d{6,})-/;

function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((r) => isLocale(r.lang));
  return match && isLocale(match.lang) ? match.lang : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const legacy = decodeURIComponent(pathname).match(LEGACY);
  if (legacy) {
    return NextResponse.rewrite(new URL(`/api/legacy/${legacy[1]}/${legacy[2]}`, request.url));
  }

  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const locale = pathname === "/" ? preferredLocale(request) : defaultLocale;
  const target = new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url);
  return NextResponse.redirect(target, pathname === "/" ? 307 : 308);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
