import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtectedRoute = path.startsWith("/dashboard");

  // Check if the user is authenticated (using a token in cookies)
  const token = request.cookies.get("auth-token")?.value;

  // If the route is protected and the user is not authenticated
  if (isProtectedRoute && !token) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Apply to all routes except for API routes, static files, and specific public routes
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
