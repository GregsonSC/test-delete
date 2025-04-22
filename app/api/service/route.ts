import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, active } = data;

    if (!name || !description || !active) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
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

    const newService = await db.service.create({ data });

    return createResponse({
      success: true,
      data: newService,
      message: "Service created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Service");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const services = await db.service.findMany();
      return createResponse({
        success: true,
        data: services,
        message: "Services retrieved successfully.",
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
    const service = await db.service.findUnique({ where: { id } });

    if (!service) {
      return createResponse({
        success: false,
        message: "Service not found.",
        errors: ["No service exists with the given ID."],
        status: 404,
      });
    }
    return createResponse({
      success: true,
      data: service,
      message: "Service retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Service");
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
    if (data.active) {
      if (typeof data.active !== "boolean") {
        return createResponse({
          success: false,
          message: "Invalid field type.",
          errors: ["'active' must be a boolean."],
          status: 400,
        });
      }
    }
    const service = await db.service.findUnique({ where: { id } });
    if (!service) {
      return createResponse({
        success: false,
        message: "Service not found.",
        errors: ["No service exists with the given ID."],
        status: 404,
      });
    }
    const updateService = await db.service.update({
      where: { id },
      data: { ...data },
    });
    return createResponse({
      success: true,
      data: updateService,
      message: "Service updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Service");
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
    await db.service.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Service deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE service");
  }
}
