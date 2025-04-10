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
  return NextResponse.json({ success, data, message, errors });
}

function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  return createResponse({
    success: false,
    message: `An error occurred in ${context}.`,
    errors: [error instanceof Error ? error.message : "Unknown error"],
    status: 500
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      description,
      active,
      county,
      heroImageUrl,
      benefitsImageUrl,
      testimonialEmbed,
      service_id,
    } = data;

    if (
      !name ||
      !description ||
      active === undefined ||
      !county ||
      !heroImageUrl ||
      !benefitsImageUrl ||
      !testimonialEmbed
      // || !service_id
    ) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
        status: 400
      });
    }

    const newServiceArea = await db.serviceArea.create({ data });

    return createResponse({
      success: true,
      data: newServiceArea,
      message: "ServiceArea created successfully.",
      status: 201
    });
  } catch (error) {
    return handleError(error, "POST ServiceArea");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const serviceAreas = await db.serviceArea.findMany();
      return createResponse({
        success: true,
        data: serviceAreas,
        message: "ServiceAreas retrieved successfully.",
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

    const serviceArea = await db.serviceArea.findUnique({ where: { id } });

    if (!serviceArea) {
      return createResponse({
        success: false,
        message: "ServiceArea not found.",
        errors: ["No serviceArea exists with the given ID."],
        status: 404
      });
    }

    return createResponse({
      success: true,
      data: serviceArea,
      message: "ServiceArea retrieved successfully.",
      status: 200
    });
  } catch (error) {
    return handleError(error, "GET ServiceArea");
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
        status: 400
      });
    }

    const existingServiceArea = await db.serviceArea.findUnique({ where: { id } });

    if (!existingServiceArea) {
      return createResponse({
        success: false,
        message: "ServiceArea not found.",
        errors: ["No serviceArea exists with the given ID."],
        status: 404
      });
    }

    const updatedServiceArea = await db.serviceArea.update({
      where: { id },
      data,
    });

    return createResponse({
      success: true,
      data: updatedServiceArea,
      message: "ServiceArea updated successfully.",
      status: 200
    });
  } catch (error) {
    return handleError(error, "PATCH ServiceArea");
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
        status: 400
      });
    }

    await db.serviceArea.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "ServiceArea deleted successfully.",
      status: 200
    });
  } catch (error) {
    return handleError(error, "DELETE ServiceArea");
  }
}
