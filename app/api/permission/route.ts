import { NextResponse } from "next/server";
import db from "@/lib/prisma";

function createResponse({
  success,
  data = null,
  message = "",
  errors = [],
  status = 200
}: {
  success: boolean;
  data?: any;
  message: string;
  errors?: string[];
  status?: number;
}) {
  return NextResponse.json({ success, data, message, errors },{status});
}

function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  return createResponse({
    success: false,
    message: `An error occurred in ${context}.`,
    errors: [error instanceof Error ? error.message : "Unknown error"],
    status: 500,
  });
}

// POST - Crear permiso
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, action, active, serviceAssociated } = data;

    if (!name || !description || !action || active === undefined || !serviceAssociated) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
        status: 400,
      });
    }

    if (typeof active !== "boolean") {
      return createResponse({
        success: false,
        message: "Invalid field type.",
        errors: ["'active' must be a boolean."],
        status: 400,
      });
    }

    const newPermission = await db.permission.create({ data });

    return createResponse({
      success: true,
      data: newPermission,
      message: "Permission created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST permission");
  }
}

// GET - Obtener uno o todos
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const permissions = await db.permission.findMany();
      return createResponse({
        success: true,
        data: permissions,
        message: "Permissions retrieved successfully.",
        status: 200,
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The id must be a valid number."],
        status: 400,
      });
    }

    const permission = await db.permission.findUnique({ where: { id } });

    if (!permission) {
      return createResponse({
        success: false,
        message: "Permission not found.",
        errors: ["No permission exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: permission,
      message: "Permission retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET permission");
  }
}

// PATCH - Actualizar permiso
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);
    const data = await request.json();

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        
        errors: ["At least one field must be provided for update."],
        status: 400,
      });

    }

    const permission = await db.permission.findUnique({ where: { id } });

    if (!permission) {
      return createResponse({
        success: false,
        message: "Permission not found.",
        errors: ["No permission exists with the given ID."],
        status: 404,
      });
    }

    const updatePermission = await db.permission.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updatePermission,
      message: "Permission updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH permission");
  }
}

// DELETE - Eliminar permiso
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The id must be a valid number."],
        status: 400,
      });
    }

    await db.permission.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Permission deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE permission");
  }
}
