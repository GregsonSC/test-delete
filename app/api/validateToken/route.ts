import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt"; // asegúrate de tener esta función


/**
 * @swagger
 * /api/validateToken:
 *   get:
 *     tags:
 *       - validacion
 *     summary: Validar sesión de usuario
 *     description: Valida si el usuario tiene una sesión activa leyendo el token desde la cookie `auth_token`.
 *     parameters:
 *       - in: cookie
 *         name: auth_token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token JWT almacenado en la cookie HttpOnly
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
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
 *                   example: "Authenticated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123"
 *                     email:
 *                       type: string
 *                       example: "usuario@ejemplo.com"
 *                     name:
 *                       type: string
 *                       example: "usuario"
 *       401:
 *         description: Token inválido o ausente
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
 *                   example: "Invalid or expired token"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Token verification failed"]
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        message: "No token found",
        errors: ["Missing auth_token cookie"],
      },
      { status: 401 }
    );
  }

  try {
    const payload = verifyToken(token); // decodifica y verifica firma
    return NextResponse.json({
      success: true,
      message: "Authenticated",
      data: payload,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired token",
        errors: ["Token verification failed"],
      },
      { status: 401 }
    );
  }
}