// middleware.ts or middleware.js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies?.get("user_token")?.value;
  const accept = request.headers.get("accept-language");

  const protectedRoutes = [
    "/domain-workspace",
    "/register",
    "/support-operation",
  ];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (request.nextUrl.pathname === "/" && isAuthenticated) {
    const loginUrl = new URL("/domain-workspace", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/domain-workspace/:path*",
    "/register/:path*",
    "/support-operation/:path*",
  ],
};
