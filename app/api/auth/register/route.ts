import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { verifyToken, hashPassword, authMiddleware } from "@/middleware/Secure-middleware";
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

/**
 * @swagger
 * /api/auth/register:
 *   get:
 *     tags:
 *       - Register
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
 *                   example: "User not found"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["User does not exist"]
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
 * /api/auth/register:
 *   patch:
 *     tags:
 *       - Register
 *     summary: Actualizar un usuario
 *     description: Actualiza la información de un usuario específico por ID. No se permite modificar el correo electrónico.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El correo electrónico del usuario (no se puede modificar).
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario (opcional).
 *               name:
 *                 type: string
 *                 description: Nombre del usuario (opcional).
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario (opcional).
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
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
 *                   example: "User  updated successfully"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: []
 *       400:
 *         description: Solicitud incorrecta
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
 *                   example: "No data provided"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Missing request body"]
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
 *                   example: "Error updating user"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: ["Unknown error"]
 */
export async function PATCH(request: NextRequest) {
  //  Validar el token primero
  const auth = authMiddleware(request);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "No data provided",
          errors: ["Missing request body"],
        },
        { status: 400 }
      );
    }

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

    if (data.email && data.email !== user.email) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Email cannot be modified",
          errors: ["Email change is not allowed"],
        },
        { status: 400 }
      );
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    delete data.email; // Por seguridad

    const updatedUser = await db.user.update({
      where: { id },
      data,
      include: { role: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedUser],
      message: "User updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating user",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /api/auth/register:
 *   delete:
 *     tags:
 *       - Register
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