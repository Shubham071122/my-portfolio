import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "auth_token";
const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

function isTokenExpired(token: string) {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return true;
    const decodedJson = Buffer.from(payloadBase64, "base64").toString();
    const payload = JSON.parse(decodedJson);
    const exp = payload.exp;
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (pathname.startsWith("/admin")) {
    if (PUBLIC_ADMIN_ROUTES.includes(pathname)) {
      if (token && !isTokenExpired(token)) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!token || isTokenExpired(token)) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      if (token) response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
