import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { verifyToken, hashPassword, authMiddleware } from "@/middleware/SecureJWT-middleware";
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Crear un nuevo usuario
 *     description: Crea un usuario con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - roleId
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               roleId:
 *                 type: integer
 *                 description: ID del rol del usuario (por ejemplo, 1 para 'admin', 2 para 'user', etc.)
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: El correo electrónico ya está registrado
 *       500:
 *         description: Error del servidor
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const userFound = await db.user.findUnique({
      where: { email: data.email },
    });

    if (userFound) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User with this email already exists",
          errors: ["Email already registered"],
        },
        { status: 400 }
      );
    }

    data.password = await hashPassword(data.password);

    const newUser = await db.user.create({
      data,
      include: { role: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: [newUser],
        message: "User created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating user",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
