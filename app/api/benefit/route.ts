import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, description, serviceAreaId } = data;

    if (!title || !description) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    const newBenefit = await db.benefit.create({ data });
    return createResponse({
      success: true,
      data: newBenefit,
      message: "Benefit created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Benefit");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const benefits = await db.benefit.findMany();
      return createResponse({
        success: true,
        data: benefits,
        message: "Benefits retrieved successfully.",
        status: 200,
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }

    const benefit = await db.benefit.findUnique({ where: { id } });
    if (!benefit) {
      return createResponse({
        success: false,
        message: "Benefit not found.",
        errors: ["No benefit exists with the given ID."],
        status: 404,
      });
    }
    return createResponse({
      success: true,
      data: benefit,
      message: "Benefit retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Benefit");
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
    if (!data || Object.keys(data).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",

        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }
    const benefit = await db.benefit.findUnique({ where: { id } });

    if (!benefit) {
      return createResponse({
        success: false,
        message: "Benefit not found.",
        errors: ["No benefit exists with the given ID."],
        status: 404,
      });
    }

    const updateBenefit = await db.benefit.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateBenefit,
      message: "Benefit updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH benefit");
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
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }

    await db.benefit.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Benefit deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Benefit");
  }
}


