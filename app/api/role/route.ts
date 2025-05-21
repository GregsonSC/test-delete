import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Roles are sets of permissions that can be assigned to multiple users who share the same or similar responsibilities, without having to manually assign each permission individually.
 * /api/role:
 *   post:
 *     tags:
 *       - Role
 *     summary: Crear un nuevo role
 *     description: Crea un rol con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - active
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       422:
 *         description: Campos faltantes o inválidos
 *       500:
 *         description: Error del servidor
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Required fields for creating a role
    const requiredFields = ["name", "active"];

    const missingFields = requiredFields.filter(
      (field) => data[field] === undefined || data[field] === null
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Missing fields in the request",
          errors: missingFields.map((field) => `Missing field '${field}'`),
        },
        { status: 400 }
      );
    }

    const newRole = await db.role.create({ data });

    return NextResponse.json(
      {
        success: true,
        data: [newRole],
        message: "Role created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating the role",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/role:
 *   get:
 *     tags:
 *       - Role
 *     summary: Obtener role
 *     description: Obtiene todos los roles o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del rol (opcional)
 *     responses:
 *       200:
 *         description: Roles obtenidos exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Rol no encontrado
 *       503:
 *         description: Error del servidor
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const roles = await db.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          active: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: roles,
        message: "Roles fetched successfully",
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

    const role = await db.role.findUnique({ where: { id } });

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Role not found",
          errors: ["Role does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [role],
        message: "Role fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching role",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 503 }
    );
  }
}

/**
 * @swagger
 * /api/role:
 *   patch:
 *     tags:
 *       - Role
 *     summary: Actualizar un role
 *     description: Actualiza parcialmente un rol por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
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

    const role = await db.role.findUnique({ where: { id } });

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Role not found",
          errors: ["Role does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedRole = await db.role.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: [updatedRole],
      message: "Role updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating role",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 503 }
    );
  }
}

/**
 * @swagger
 * /api/role:
 *   delete:
 *     tags:
 *       - Role
 *     summary: Eliminar un role
 *     description: Elimina un rol existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       503:
 *         description: Error del servidor
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const roleExists = await db.role.findUnique({ where: { id } });

    if (!roleExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Role not found",
          errors: ["Role does not exist"],
        },
        { status: 404 }
      );
    }

    const role = await db.role.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [role],
        message: "Role deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting role",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
