import { NextResponse } from "next/server";
import db from "@/lib/prisma";

// Función de respuesta genérica
function createResponse({
  success,
  data = null,
  message,
  errors = [],
  status = 200
}: {
  success: boolean;
  data?: any;
  message: string;
  errors?: string[];
  status?: number;
}) {
  return NextResponse.json({ success, data, message, errors });
}

// Manejo de errores
function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  return createResponse({
    success: false,
    message: `An error occurred in ${context}.`,
    errors: [error instanceof Error ? error.message : "Unknown error"],
    status: 500
  });
}

// POST - Crear estimate
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { estimatedTime, description, state, lead_id, totalValue } = data;

    if (!estimatedTime || !description || !state || !totalValue) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400
      });
    }

    if (isNaN(totalValue) || typeof totalValue !== "number") {
      return createResponse({
        success: false,
        message: "Invalid totalValue.",
        errors: ["totalValue must be a decimal number."],
        status: 400
      });
    }

    const newEstimate = await db.estimate.create({ data });

    return createResponse({
      success: true,
      data: newEstimate,
      message: "Estimate created successfully.",
      status: 201
    });
  } catch (error) {
    return handleError(error, "POST estimate");
  }
}

// GET - Obtener uno o todos
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const estimates = await db.estimate.findMany();
      return createResponse({
        success: true,
        data: estimates,
        message: "Estimates retrieved successfully.",
        status: 200
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The id must be a valid number."],
        status: 400
      });
    }

    const estimate = await db.estimate.findUnique({ where: { id } });

    if (!estimate) {
      return createResponse({
        success: false,
        message: "Estimate not found.",
        errors: ["No estimate exists with the given ID."],
        status:404
      });
    }

    return createResponse({
      success: true,
      data: estimate,
      message: "Estimate retrieved successfully.",
      status:201
    });
  } catch (error) {
    return handleError(error, "GET estimate");
  }
}

// PATCH - Actualizar
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
        status:400
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        errors: ["At least one field must be provided for update."],
        status:400
      });
    }

    const estimate = await db.estimate.findUnique({ where: { id } });

    if (!estimate) {
      return createResponse({
        success: false,
        message: "Estimate not found.",
        errors: ["No estimate exists with the given ID."],
        status:404
      });
    }

    const updateEstimate = await db.estimate.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateEstimate,
      message: "Estimate updated successfully.",
      status:200
    });
  } catch (error) {
    return handleError(error, "PATCH estimate");
  }
}

// DELETE - Eliminar
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
        status:400
      });
    }

    const relatedProjects = await db.project.findMany({
      where: { estimate_id: id },
    });

    if (relatedProjects.length > 0) {
      return createResponse({
        success: false,
        message: "Estimate has related projects.",
        errors: ["Cannot delete estimate because it is associated with projects."],
        status:400
      });
    }

    await db.estimate.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Estimate deleted successfully.",
      status:200
    });
  } catch (error) {
    return handleError(error, "DELETE estimate");
  }
}
