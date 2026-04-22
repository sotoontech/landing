import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Don't apply i18n redirects to admin or API routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = i18n.defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|images|uploads|favicon.ico|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|avif)).*)",
  ],
};
