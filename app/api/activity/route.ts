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

    const newActivity = await db.activity.create({ data });

    return createResponse({
      success: true,
      data: newActivity,
      message: "Activity created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Activity");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const activities = await db.activity.findMany();
      return createResponse({
        success: true,
        data: activities,
        message: "Activities retrieved successfully.",
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

    const activity = await db.activity.findUnique({ where: { id } });
    if (!activity) {
      return createResponse({
        success: false,
        message: "Activity not found.",
        errors: ["No Activity exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: activity,
      message: "Activity retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Activity");
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

    const activity = await db.activity.findUnique({ where: { id } });
    if (!activity) {
      return createResponse({
        success: false,
        message: "Activity not found.",
        errors: ["No Activity exists with the given ID."],
        status: 404,
      });
    }

    const updateActivity = await db.activity.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateActivity,
      message: "Activity updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Activity");
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

    await db.activity.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Activity deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Activity");
  }
}
