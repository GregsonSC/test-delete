import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Helper function to validate JWT token
async function validateToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const result = await jwtVerify(token, secret);
    return { valid: true, payload: result.payload };
  } catch (error) {
    console.log("Token validation failed:", error);
    return { valid: false, error };
  }
}

export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Check if the current path is login or register
  const isAuthPage = path === "/login" || path === "/register";

  // Check if the user is authenticated (using a token in cookies)
  const token = request.cookies.get("auth_token")?.value;

  // If user is on auth page and has a valid token, redirect to profile
  if (isAuthPage && token) {
    const { valid } = await validateToken(token);
    if (valid) {
      return NextResponse.redirect(new URL("/profile-settings", request.url));
    }
    // If token is invalid, continue to the auth page
  }

  // For non-auth pages (protected routes), verify authentication
  if (!isAuthPage) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Verify token for protected routes
    const { valid } = await validateToken(token);
    if (!valid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Token is valid, proceed to the protected route
  }

  // For all other cases, proceed normally
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Auth pages (to redirect if user is already logged in)
    "/login",
    "/register",
    // Protected routes that require authentication
    "/profile-settings",
    // Add other protected routes as needed
  ],
};
