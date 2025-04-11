import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/roles
 * @desc Crear un nuevo rol
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Role name is required",
        errors: ["Missing 'name' field"]
      }, { status: 400 });
    }

    const newRole = await db.role.create({ data });

    return NextResponse.json({
      success: true,
      data: [newRole],
      message: "Role created successfully",
      errors: []
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error creating role",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
  }
}

/**
 * @route GET /api/roles
 * @desc Obtener todos los roles o uno específico por id (?id=)
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
        },
      });

      return NextResponse.json({
        success: true,
        data: roles,
        message: "Roles fetched successfully",
        errors: []
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "The id must be a valid number",
        errors: ["Invalid ID"]
      }, { status: 400 });
    }

    const role = await db.role.findUnique({ where: { id } });

    if (!role) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Role not found",
        errors: ["Role does not exist"]
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: [role],
      message: "Role fetched successfully",
      errors: []
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error fetching role",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
  }
}

/**
 * @route PATCH /api/roles?id={id}
 * @desc Actualizar un rol parcialmente
 */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "No data provided",
        errors: ["Missing request body"]
      }, { status: 400 });
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "The ID must be a valid number",
        errors: ["Invalid ID"]
      }, { status: 400 });
    }

    const role = await db.role.findUnique({ where: { id } });

    if (!role) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Role not found",
        errors: ["Role does not exist"]
      }, { status: 404 });
    }

    const updatedRole = await db.role.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: [updatedRole],
      message: "Role updated successfully",
      errors: []
    });

  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error updating role",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
  }
}

/**
 * @route DELETE /api/roles?id={id}
 * @desc Eliminar un rol por ID
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const roleExists = await db.role.findUnique({ where: { id } });

    if (!roleExists) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Role not found",
        errors: ["Role does not exist"]
      }, { status: 404 });
    }

    const role = await db.role.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: [role],
      message: "Role deleted successfully",
      errors: []
    }, { status: 200 });

  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error deleting role",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
  }
}
