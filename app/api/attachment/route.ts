import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { createImage } from "../cloudinary/upload/route";
import { TypeAttachment } from "@prisma/client";

const validType = ["IMAGE", "DOCUMENT", "URL", "VIDEO", "OTHERS"];

/**
 * @swagger
 * tags:
 *   - name: Attachment
 *     description: Digital resource that must be stored in the project's file database, as it can be an image, a document, a video, among others. Several tables are related to this one since they need to have associated resources, such as an Activity, a Ticket, among others.
 * /api/attachment:
 *   post:
 *     tags:
 *       - Attachment
 *     summary: Create a new Attachment
 *     description: Creates a new attachment with name, description, type, and url fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - type
 *               - url
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [IMAGE, DOCUMENT, URL, VIDEO, OTHERS]
 *               url:
 *                 type: string
 *               activityId:
 *                 type: integer
 *               ticketId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Attachment created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const type = formData.get("type")?.toString();

    const urlForm = formData.get("url");

    if (!(urlForm instanceof File)) {
      return createResponse({
        success: false,
        message: "The image must be valid file.",
        errors: ["Must be uploaded as file."],
        status: 400,
      });
    }
    const url = await createImage(urlForm);

    const activityId = formData.get("activityId")
      ? parseInt(formData.get("activityId")!.toString(), 10)
      : undefined;
    const ticketId = formData.get("ticketId")
      ? parseInt(formData.get("ticketId")!.toString(), 10)
      : undefined;
    const productId = formData.get("productId")
      ? parseInt(formData.get("productId")!.toString(), 10)
      : undefined;

    if (!name || !description || !type || !url || !activityId || !ticketId) {
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

    const newAttachment = await db.attachment.create({
      data: {
        name,
        description,
        type: type as TypeAttachment,
        url,
        activityId,
        ticketId,
        productId,
      },
    });

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
/**
 * @route GET /api/attachment
 * @desc Obtener uno o todos los archivos adjuntos
 * @swagger
 * /api/attachment:
 *   get:
 *     tags:
 *       - Attachment
 *     summary: Get one or all Attachments
 *     description: Retrieve all attachments or a specific one by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the attachment to retrieve.
 *     responses:
 *       200:
 *         description: Attachment(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Attachment not found.
 *       500:
 *         description: Server error.
 */

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
/**
 * @route PATCH /api/attachment
 * @desc Actualizar un archivo adjunto existente
 * @swagger
 * /api/attachment:
 *   patch:
 *     tags:
 *       - Attachment
 *     summary: Update an Attachment
 *     description: Update one or more fields of an attachment by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the attachment to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [IMAGE, DOCUMENT, URL, VIDEO, OTHERS]
 *               url:
 *                 type: string
 *               activityId:
 *                 type: integer
 *               ticketId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Attachment updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *       404:
 *         description: Attachment not found.
 *       500:
 *         description: Server error.
 */

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const type = formData.get("type")?.toString();

    const urlForm = formData.get("url");
    const url = urlForm instanceof File ? await createImage(urlForm) : undefined;

    if (type) {
      if (!validType.includes(type)) {
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
    const updatedData: any = {};
    if (name) updatedData.name = name;
    if (description) updatedData.description = description;
    if (type) updatedData.type = type as TypeAttachment;
    if (url) updatedData.url = url;

    if (Object.keys(updatedData).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }

    const updateAttachment = await db.attachment.update({
      where: { id },
      data: updatedData,
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
/**
 * @route DELETE /api/attachment
 * @desc Eliminar un archivo adjunto
 * @swagger
 * /api/attachment:
 *   delete:
 *     tags:
 *       - Attachment
 *     summary: Delete an Attachment
 *     description: Delete an attachment by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the attachment to delete.
 *     responses:
 *       200:
 *         description: Attachment deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       500:
 *         description: Server error.
 */

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
