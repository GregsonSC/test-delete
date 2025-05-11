import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import argon2 from "argon2";
import { signToken } from "@/lib/jwt";
import { loginRateLimit } from "@/app/api/utils/login-rate-limit";
import { isValidIP, isPrivateIP } from "@/middleware/validationIP";
import { checkBlocked } from "@/middleware/BlockedIP"; 
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión proporcionando su correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@ejemplo.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "contraseñaSegura123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "usuario@ejemplo.com"
 *                     name:
 *                       type: string
 *                       example: "Nombre del Usuario"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: []
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Credentials mismatch"]
 *       423:
 *         description: Demasiados intentos de inicio de sesión (Usuario bloqueado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Too many failed attempts. Temporarily blocked."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Blocked by security policy"]
 *       429:
 *         description: Demasiados intentos de inicio de sesión (Rate limit excedido)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Too many login attempts. Please try again later."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Rate limit exceeded"]
 */

// Se crea un *rate limiter* que permite 3 intentos de login cada 60 segundos.
const limiter = loginRateLimit(3, 60 * 1000); // 3 intentos cada 60 segundos

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const { blocked, ip } = await checkBlocked(request, email);

  if (blocked) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many failed attempts. Temporarily blocked.",
        errors: ["Blocked by security policy"],
        data: [],
      },
      { status: 423 }
    );
  }

  const limitCheck = limiter(ip);
  if (!limitCheck.allowed) {
    await db.loginAttempt.create({
      data: {
        ip,
        email,
        success: false,
      },
    });

    return NextResponse.json(
      {
        success: false,
        message: "Too many login attempts. Please try again later.",
        errors: ["Rate limit exceeded"],
        data: [],
      },
      { status: 429 }
    );
  }

  const user = await db.user.findUnique({ where: { email } });
  const passwordValid = user && (await argon2.verify(user.password, password));
  const success = !!passwordValid;

  await db.loginAttempt.create({
    data: {
      ip,
      email,
      success,
    },
  });

  if (!success) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password",
        errors: ["Credentials mismatch"],
        data: [],
      },
      { status: 401 }
    );
  }

  const token = signToken({ id: user.id, email: user.email, name: user.name });

  const response = NextResponse.json({
    success: true,
    message: "Login successful",
    data: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    errors: [],
  });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}