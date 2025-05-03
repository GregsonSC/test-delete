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
  
  // Create a response object that we'll modify as needed
  let response = NextResponse.next();

  // If user is on auth page and has a token
  if (isAuthPage && token) {
    const { valid } = await validateToken(token);
    if (valid) {
      // Redirect to profile if token is valid
      return NextResponse.redirect(new URL("/profile-settings", request.url));
    } else {
      // Clear the invalid token and continue to auth page
      response = NextResponse.next();
      response.cookies.delete("auth_token");
      return response;
    }
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
      // Clear the invalid token and redirect to login with a special parameter
      const loginUrl = new URL("/login?session_expired=true", request.url);
      response = NextResponse.redirect(loginUrl);
      response.cookies.delete("auth_token");
      return response;
    }
    // Token is valid, proceed to the protected route
  }

  // For all other cases, proceed normally
  return response;
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
