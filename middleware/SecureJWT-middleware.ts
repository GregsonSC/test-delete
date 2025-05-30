import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Funciones internas
export function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7h",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  return await argon2.hash(password);
}

export async function verifyPassword(password: string, hash: string) {
  return await argon2.verify(hash, password);
}
export function authMiddleware(request: NextRequest) {
  let token: string | undefined;

  // 1. Intenta obtener el token del header Authorization
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Si no hay header, intenta obtener el token de la cookie
  if (!token) {
    const cookieToken = request.cookies.get("auth_token")?.value;
    if (cookieToken) token = cookieToken;
  }

  // 3. Si no hay token, responde Unauthorized
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // 4. Verifica el token
  const decoded = verifyToken(token);

  if (!decoded) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  (request as any).user = decoded;

  return null; // Continúa si todo está bien
}
