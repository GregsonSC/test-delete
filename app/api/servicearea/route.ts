import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";

const validCounty = ["MIAMI_DATE", "BROWARD", "WEST_PALM_BEACH"];
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
        status: 400,
      });
    }
    if (!validCounty.includes(county)) {
      return createResponse({
        success: false,
        message: "Invalid county.",
        errors: [`County must be one of: ${county.join(", ")}`],
        status: 400,
      });
    }
    const newServiceArea = await db.serviceArea.create({ data });

    return createResponse({
      success: true,
      data: newServiceArea,
      message: "ServiceArea created successfully.",
      status: 201,
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

    const serviceArea = await db.serviceArea.findUnique({ where: { id } });

    if (!serviceArea) {
      return createResponse({
        success: false,
        message: "ServiceArea not found.",
        errors: ["No serviceArea exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: serviceArea,
      message: "ServiceArea retrieved successfully.",
      status: 200,
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
        status: 400,
      });
    }

    const existingServiceArea = await db.serviceArea.findUnique({ where: { id } });

    if (!existingServiceArea) {
      return createResponse({
        success: false,
        message: "ServiceArea not found.",
        errors: ["No serviceArea exists with the given ID."],
        status: 404,
      });
    }
    if (data.county) {
      if (!validCounty.includes(data.county)) {
        return createResponse({
          success: false,
          message: "Invalid county.",
          errors: [`County must be one of: ${validCounty.join(", ")}`],
          status: 400,
        });
      }
    }

    const updatedServiceArea = await db.serviceArea.update({
      where: { id },
      data,
    });

    return createResponse({
      success: true,
      data: updatedServiceArea,
      message: "ServiceArea updated successfully.",
      status: 200,
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
        status: 400,
      });
    }

    await db.serviceArea.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "ServiceArea deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE ServiceArea");
  }
}
