import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  LOCALE_COOKIE,
  hasLocale,
  localeFromAcceptLanguage,
} from "@/i18n/config";

/**
 * Sends "/" to the visitor's language: their saved choice first,
 * then the browser's preferred language.
 */
export function proxy(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    saved && hasLocale(saved)
      ? saved
      : localeFromAcceptLanguage(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;

  const response = NextResponse.redirect(url);
  // The redirect depends on these request values, so caches must key on them.
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: "/",
};
