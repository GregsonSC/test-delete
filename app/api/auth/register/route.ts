import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { verifyToken, hashPassword, authMiddleware } from "@/middleware/SecureJWT-middleware";
import { createImage } from "../../cloudinary/upload/route";
import { createResponse, handleError } from "@/app/api/utils/handlers";
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Crear un nuevo usuario
 *     description: Crea un usuario con los datos enviados en el formulario, incluyendo una imagen de perfil.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - roleId
 *               - address
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
 *                 nullable: true
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *               roleId:
 *                 type: integer
 *                 description: ID del rol del usuario (1 = Admin, 2 = Usuario, etc.)
 *               address:
 *                 type: string
 *                 description: Dirección del usuario.
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Solicitud inválida. Verifique los campos enviados.
 *       500:
 *         description: Error interno del servidor.
 */

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    const name = form.get("name")?.toString();
    const phone = form.get("phone")?.toString() || null;
    const roleIdRaw = form.get("roleId")?.toString();
    const imageFile = form.get("imageUrl");
    const address = form.get("address")?.toString();

    if (!email || !password || !name || !phone || !roleIdRaw || !address) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Missing required fields",
          errors: ["email, password, name, roleId and address are required"],
        },
        { status: 400 }
      );
    }

    const roleId = parseInt(roleIdRaw);

    if (isNaN(roleId)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Invalid roleId",
          errors: ["roleId must be an integer"],
        },
        { status: 400 }
      );
    }

    const userFound = await db.user.findUnique({ where: { email } });
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

    const hashedPassword = await hashPassword(password);

    if (!(imageFile instanceof File)) {
      return createResponse({
        success: false,
        message: "The image must be valid file.",
        errors: ["Must be uploaded as file."],
        status: 400,
      });
    }
    const imageUrl = await createImage(imageFile);

    if (!imageUrl) {
      return createResponse({
        success: false,
        message: "The image was not uploaded to cloudinary",
        errors: ["Error cloudinary."],
        status: 400,
      });
    }

    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        imageUrl,
        roleId,
        address,
      },
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
