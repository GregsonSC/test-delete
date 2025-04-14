import { NextResponse } from "next/server";
import db from "@/lib/prisma";

function createResponse({
  success,
  data = null,
  message = "",
  errors = [],
  status = 200,
}: {
  success: boolean;
  data?: any;
  message: string;
  errors?: string[];
  status?: number;
}) {
  return NextResponse.json({ success, data, message, errors }, { status });
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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, expectedDuration, startDate, endDate, state } = data;

    if (!name || !description || !expectedDuration || !startDate || !endDate || !state) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
        status: 400,
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for startDate and endDate."],
        status: 400,
      });
    }

    const newPhase = await db.phase.create({ data });

    return createResponse({
      success: true,
      data: newPhase,
      message: "Phase created successfully.",
      status: 201,
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

    const phase = await db.phase.findUnique({ where: { id } });
    if (!phase) {
      return createResponse({
        success: false,
        message: "Phase not found.",
        errors: ["No Phase exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: phase,
      message: "Phase retrieved successfully.",
      status: 200,
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
        status: 400,
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
        status: 400,
      });
    }

    const phase = await db.phase.findUnique({ where: { id } });
    if (!phase) {
      return createResponse({
        success: false,
        message: "Phase not found.",
        errors: ["No phase exists with the given ID."],
        status: 404,
      });
    }

    const updatedPhase = await db.phase.update({ where: { id }, data: { ...data } });

    return createResponse({
      success: true,
      data: updatedPhase,
      message: "Phase updated successfully.",
      status: 200,
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
        status: 400,
      });
    }

    await db.phase.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Phase deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Phase");
  }
}
