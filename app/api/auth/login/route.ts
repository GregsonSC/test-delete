import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import argon2 from "argon2";
import { signToken } from "@/lib/jwt";

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
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Credentials mismatch"]
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: []
 */
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await db.user.findUnique({ where: { email } });

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

  const token = signToken({ id: user.id, email: user.email });

  return NextResponse.json({
    success: true,
    message: "Login successful",
    data: [{ token }],
    errors: [],
  });
}
