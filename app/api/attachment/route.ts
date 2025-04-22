import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

const validType = ["IMAGE", "DOCUMENT", "URL", "VIDEO", "OTHERS"];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, type, url, activityId, ticketId } = data;

    if (!name || !description || !type || !url) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }
    if (!validType.includes(type)) {
      return createResponse({
        success: false,
        message: "Invalid type.",
        errors: [`Type must be one of: ${validType.join(", ")}`],
        status: 400,
      });
    }

    const newAttachment = await db.attachment.create({ data });
    return createResponse({
      success: true,
      data: newAttachment,
      message: "Attachment created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Attachment");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const attachments = await db.attachment.findMany();
      return createResponse({
        success: true,
        data: attachments,
        message: "Attachments retrieved successfully.",
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
    const attachment = await db.attachment.findUnique({ where: { id } });
    if (!attachment) {
      return createResponse({
        success: false,
        message: "Attachment not found.",
        errors: ["No attachment exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: attachment,
      message: "Attachment retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Attachment");
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
    if (data.type) {
      if (!validType.includes(data.type)) {
        return createResponse({
          success: false,
          message: "Invalid type.",
          errors: [`Type must be one of: ${validType.join(", ")}`],
          status: 400,
        });
      }
    }
    const attachment = await db.attachment.findUnique({ where: { id } });
    if (!attachment) {
      return createResponse({
        success: false,
        message: "Attachment not found.",
        errors: ["No attachment exists with the given ID."],
        status: 404,
      });
    }

    const updateAttachment = await db.attachment.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateAttachment,
      message: "Attachment updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Attachment");
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

    await db.attachment.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Attachment deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Attachment");
  }
}
