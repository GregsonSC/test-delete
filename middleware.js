import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the user is authenticated (using a token in cookies)
  const token = request.cookies.get("auth_token")?.value;

  // If the user is not authenticated
  if (!token) {
    // Redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists, verify it
  try {
    // Get the JWT secret from environment variables
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    console.log("VALIDANDO"); // Log the token for debugging purpose
    
    // Verify the token
    await jwtVerify(token, secret);
    
    // Token is valid, proceed to the protected route
    return NextResponse.next();
  } catch (error) {
    // Token verification failed, redirect to login
    console.log("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Protected routes that require authentication
    "/profile-settings",
    // Add other protected routes as needed
  ],
};
