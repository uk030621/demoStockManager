import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  // If no token exists, redirect to the login page (absolute URL)
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // Optionally, skip token validation here and handle it in your routes
  return NextResponse.next();
}

// Apply the middleware to protected routes
export const config = {
  matcher: [
    "/intro/:path*",
    "/usstock/:path*",
    "/ukstock/:path*",
    "/eustock/:path*",
    "/asiastock/:path*",
    "/currency/:path*",
    "/symbolsearch/:path*",
  ], // Add paths for protected pages
};
