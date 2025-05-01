import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import argon2 from "argon2";
import { signToken } from "@/lib/jwt";
import { loginRateLimit } from "@/app/api/utils/login-rate-limit";

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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       token:
 *                         type: string
 *                         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
  // Se obtiene la IP del cliente desde el encabezado 'x-forwarded-for'.
  const forwardedFor = request.headers.get("x-forwarded-for");
  // Si existe, se toma la primera IP (en caso de proxies); si no, se asigna "unknown".
  //Probar cuando allan proxies,ya que estos ocultan la ip del usuario
  const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : "unknown";

  const limitCheck = limiter(ip as string);

  if (!limitCheck.allowed) {
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

  const { email, password } = await request.json();

  //Buscamos en la BD
  const user = await db.user.findUnique({ where: { email } });

  //Si las credenciales del correo y la contraseña no conciden respondera con un 401
  if (!user || !(await argon2.verify(user.password, password))) {
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

  //Si el correo y la contraseña son correctos devolvera el JWT
  const token = signToken({ id: user.id, email: user.email, name: user.name });

  //Respuesta exitosa con el token
  return NextResponse.json({
    success: true,
    message: "Login successful",
    data: [{ token }],
    errors: [],
  });
}
