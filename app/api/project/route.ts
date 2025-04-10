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
    const { name, description, expectedDuration, startDate, endDate, currentPhase } = data;

    if (!name || !description || !expectedDuration || !startDate || !endDate || !currentPhase) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for startDate and endDate."],
      });
    }

    const newProject = await db.project.create({ data });

    return createResponse({
      success: true,
      data: newProject,
      message: "Project created successfully.",
    });
  } catch (error) {
    return handleError(error, "POST Project");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const projects = await db.project.findMany();
      return createResponse({
        success: true,
        data: projects,
        message: "Projects retrieved successfully.",
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

    const project = await db.project.findUnique({ where: { id } });

    if (!project) {
      return createResponse({
        success: false,
        message: "Project not found.",
        errors: ["No project exists with the given ID."],
      });
    }

    return createResponse({
      success: true,
      data: project,
      message: "Project retrieved successfully.",
    });
  } catch (error) {
    return handleError(error, "GET Project");
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

    if (data.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.startDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Invalid startDate format. Use YYYY-MM-DD."],
      });
    }
    if (data.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.endDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Invalid endDate format. Use YYYY-MM-DD."],
      });
    }

    const project = await db.project.findUnique({ where: { id } });

    if (!project) {
      return createResponse({
        success: false,
        message: "Project not found.",
        errors: ["No project exists with the given ID."],
      });
    }

    const updateProject = await db.project.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateProject,
      message: "Project updated successfully.",
    });
  } catch (error) {
    return handleError(error, "PATCH Project");
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

    await db.project.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    return handleError(error, "DELETE Project");
  }
}
