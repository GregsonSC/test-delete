import { NextResponse } from "next/server";
import db from "@/lib/prisma";

function createResponse({
  success,
  data = null,
  message = "",
  errors = [],
}: {
  success: boolean;
  data?: any;
  message: string;
  errors?: string[];
}) {
  return NextResponse.json({ success, data, message, errors });
}

function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  return createResponse({
    success: false,
    message: `An error occurred in ${context}.`,
    errors: [error instanceof Error ? error.message : "Unknown error"],
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, expectedDuration, startDate, endDate, state } = data;

    //It is verified whether any of the required fields was not provided.
    if (!name || !description || !expectedDuration || !startDate || !endDate || !state) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
      });
    }

    //It is validated that the dates have the correct format.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for startDate and endDate."],
      });
    }

    //A new phase is created in the database.
    const newPhase = await db.phase.create({ data });

    return createResponse({
      success: true,
      data: newPhase,
      message: "Phase created successfully.",
    });
  } catch (error) {
    return handleError(error, "POST Phase");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const phases = await db.phase.findMany();
      return createResponse({
        success: true,
        data: phases,
        message: "Phases retrieved successfully.",
      });
    }
    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The id must be a valid number."],
      });
    }
    const phase = await db.phase.findUnique({ where: { id } });
    if (!phase) {
      return createResponse({
        success: false,
        message: "Phase not found.",
        errors: ["No Phase exists with the given ID."],
      });
    }
    return createResponse({
      success: true,
      data: phase,
      message: "Phase retrieved successfully.",
    });
  } catch (error) {
    return handleError(error, "GET Phase");
  }
}

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
      });
    }
    if (
      (data.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.startDate)) ||
      (data.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.endDate))
    ) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Invalid startDate format. Use YYYY-MM-DD."],
      });
    }
    const phase = await db.phase.findUnique({ where: { id } });
    if (!phase) {
      return createResponse({
        success: false,
        message: "Phase not found.",
        errors: ["No phase exists with the given ID."],
      });
    }
    const updatePhase = await db.phase.update({ where: { id }, data: { ...data } });
    return createResponse({
      success: true,
      data: updatePhase,
      message: "Phase updated successfully.",
    });
  } catch (error) {
    return handleError(error, "PATCH Phase");
  }
}
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
      });
    }
    await db.phase.delete({ where: { id } });
    return createResponse({
      success: true,
      message: "Phase deleted successfully.",
    });
  } catch (error) {
    return handleError(error, "DELETE Phase");
  }
}
