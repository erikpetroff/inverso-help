import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { slugExists } from "@/lib/known-slugs";

// Intercom article/collection ids are 7+ digits: /bg/articles/11018442-1-достъп-до-модула-фактури
const LEGACY = /^\/(bg|en)\/(articles|collections)\/(\d{6,})-/;

// Metadata image routes (og:image) are emitted with the internal /bg prefix.
const METADATA_IMAGE = /\/(opengraph|twitter)-image(-[\w-]+)?$/;

const CONTENT_PAGE = /^\/(?:bg|en)\/(articles|collections)\/([^/]+)\/?$/;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const legacy = decodeURIComponent(pathname).match(LEGACY);
  if (legacy) {
    const [, lang, kind, id] = legacy;
    return NextResponse.rewrite(new URL(`/api/legacy/${lang}/${kind}/${id}`, request.url));
  }

  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    if (METADATA_IMAGE.test(pathname)) return NextResponse.next();
    const target = request.nextUrl.clone();
    target.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(target, 308);
  }

  const locale: Locale = isLocale(first) ? first : defaultLocale;
  const target = request.nextUrl.clone();
  if (!isLocale(first)) target.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;

  const content = target.pathname.match(CONTENT_PAGE);
  if (content) {
    const [, kind, slug] = content;
    if (!(await slugExists(locale, kind as "articles" | "collections", decodeURIComponent(slug)))) {
      target.pathname = `/${locale}/not-found`;
      return NextResponse.rewrite(target);
    }
  }

  return isLocale(first) ? NextResponse.next() : NextResponse.rewrite(target);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
