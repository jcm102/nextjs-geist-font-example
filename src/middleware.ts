import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the auth cookie
  const authCookie = request.cookies.get("auth")

  // Check if the request is for the login page or API
  const isLoginPage = request.nextUrl.pathname === "/login"
  const isLoginApi = request.nextUrl.pathname === "/api/auth/login"

  // If authenticated and trying to access login page, redirect to home
  if (authCookie?.value === "authenticated" && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // If not authenticated and not trying to access login page or login API, redirect to login
  if (!authCookie?.value && !isLoginPage && !isLoginApi) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
