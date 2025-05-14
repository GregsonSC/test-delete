import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { verifyToken, hashPassword, authMiddleware } from "@/middleware/SecureJWT-middleware";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { createImage } from "../cloudinary/upload/route";
/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - User
 *     summary: Obtener usuarios
 *     description: Recupera una lista de usuarios o un usuario específico por ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         description: ID del usuario a recuperar. Si no se proporciona, se devolverán todos los usuarios.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuarios recuperados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       phone:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       address:  # Valor agregado
 *                         type: string
 *                       role:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                 message:
 *                   type: string
 *                   example: "Users fetched successfully"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: []
 *       400:
 *         description: El ID debe ser un número válido
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
 *                   example: "The id must be a valid number"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Invalid ID"]
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "User  not found"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["User  does not exist"]
 *       500:
 *         description: Error del servidor
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
 *                   example: "Error fetching users"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Unknown error"]
 */

export async function GET(request: NextRequest) {
  //  Validar el token antes de continuar
  const auth = authMiddleware(request);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const users = await db.user.findMany({
        select: {
          id: true,
          name: true,
          password: true, // <-- Puedes eliminarlo ahora
          email: true,
          phone: true,
          imageUrl: true,
          address:true,
          role: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: users,
        message: "Users fetched successfully",
        errors: [],
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The id must be a valid number",
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User not found",
          errors: ["User does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: [user],
      message: "User fetched successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching users",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /api/user:
 *   patch:
 *     tags:
 *       - User
 *     summary: Update a user
 *     description: Updates a user's information by ID. Accepts name, phone, password, image, and roleId. At least one field must be provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 example: "+123456789"
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: Profile image of the user (optional).
 *               address:  # Valor agregado
 *                 type: string
 *                 example: "123 Main St, Anytown, USA"
 *               roleId:
 *                 type: integer
 *                 example: 2
 *                 description: The ID of the user's role.
 *     responses:
 *       200:
 *         description: User updated successfully.
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
 *                   example: "User  updated successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       phone:
 *                         type: string
 *                         example: "+123456789"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://cloudinary.com/path/to/image.jpg"
 *                       address:  # Valor agregado
 *                         type: string
 *                         example: "123 Main St, Anytown, USA"
 *                       role:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: "Admin"
 *       400:
 *         description: Invalid ID or no data provided.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error while updating user.
 */
export async function PATCH(request: NextRequest) {
  // Validar el token primero
  const auth = authMiddleware(request);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The ID must be a valid number",
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User not found",
          errors: ["User does not exist"],
        },
        { status: 404 }
      );
    }

    const form = await request.formData();
    const name = form.get("name")?.toString() || undefined;
    const phone = form.get("phone")?.toString() || undefined;
    const password = form.get("password")?.toString();
    const imageFile = form.get("imageUrl");
    const roleIdRaw = form.get("roleId")?.toString();
    const roleId = roleIdRaw ? parseInt(roleIdRaw) : undefined;

    if (roleId) {
      if (roleIdRaw && isNaN(roleId)) {
        return createResponse({
          success: false,
          message: "Invalid roleId",
          errors: ["roleId must be an integer"],
          status: 400,
        });
      }
    }

    const updatedData: any = {};

    if (name) updatedData.name = name;
    if (phone) updatedData.phone = phone;
    if (roleId !== undefined) updatedData.roleId = roleId;
    if (password) updatedData.password = await hashPassword(password);
    if (imageFile && imageFile instanceof File) {
      const imageUrl = await createImage(imageFile);
      if (!imageUrl) {
        return createResponse({
          success: false,
          message: "The image was not uploaded to cloudinary",
          errors: ["Cloudinary error."],
          status: 400,
        });
      }
      updatedData.imageUrl = imageUrl;
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: updatedData,
      include: { role: true },
    });

    return createResponse({
      success: true,
      message: "User updated successfully",
      data: [updatedUser],
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return createResponse({
      success: false,
      message: "Error updating user",
      errors: [error instanceof Error ? error.message : "Unknown error"],
      status: 500,
    });
  }
}

/**
 * @swagger
 * /api/user:
 *   delete:
 *     tags:
 *       - User
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario específico por ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       phone:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       role:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                 message:
 *                   type: string
 *                   example: "User  deleted successfully"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: []
 *       404:
 *         description: Usuario no encontrado
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
 *                   example: "User  not found"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["User  does not exist"]
 *       500:
 *         description: Error del servidor
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
 *                   example: "Error deleting user"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Unknown error"]
 */
export async function DELETE(request: NextRequest) {
  //  Verificar token
  const auth = authMiddleware(request);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    const userExists = await db.user.findUnique({ where: { id } });

    if (!userExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User not found",
          errors: ["User does not exist"],
        },
        { status: 404 }
      );
    }

    const user = await db.user.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: [user],
      message: "User deleted successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting user",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
