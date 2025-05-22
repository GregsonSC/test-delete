import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";


/**
 * @swagger
 * /api/tag:
 *   post:
 *     tags:
 *       - Tag
 *     summary: Create a new tag
 *     description: Create a new tag with a name.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tag.
 *     responses:
 *       201:
 *         description: Tag created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name } = data;

   

    const newTag = await db.tag.create({ data });
    return createResponse({
      success: true,
      data: newTag,
      message: "Tag created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Tag");
  }
}
/**
 * @swagger
 * /api/tag:
 *   get:
 *     tags:
 *       - Tag
 *     summary: Retrieve tags
 *     description: Retrieve a list of all tags, or a specific tag by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the tag to retrieve (optional).
 *     responses:
 *       200:
 *         description: Tags retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const tags = await db.tag.findMany();
      return createResponse({
        success: true,
        data: tags,
        message: "Tags retrieved successfully.",
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
    const tag = await db.tag.findUnique({ where: { id } });

    if (!tag) {
      return createResponse({
        success: false,
        message: "Tag not found.",
        errors: ["No Tag exists with the given ID."],
        status: 404,
      });
    }
    return createResponse({
      success: true,
      data: tag,
      message: "Tag retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Tag");
  }
}
/**
 * @swagger
 * /api/tag:
 *   patch:
 *     tags:
 *       - Tag
 *     summary: Update a tag
 *     description: Update one or more fields of a tag by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the tag to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tag.
 *     responses:
 *       200:
 *         description: Tag updated successfully.
 *       400:
 *         description: Invalid ID or missing update data.
 *       404:
 *         description: Tag not found.
 *       500:
 *         description: Server error.
 */

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
    const tag = await db.tag.findUnique({ where: { id } });

    if (!tag) {
      return createResponse({
        success: false,
        message: "Tag not found.",
        errors: ["No Tag exists with the given ID."],
        status: 404,
      });
    }
    const updateTag = await db.tag.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateTag,
      message: "Tag updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Tag");
  }
}
/**
 * @swagger
 * /api/tag:
 *   delete:
 *     tags:
 *       - Tag
 *     summary: Delete a tag
 *     description: Delete a tag by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the tag to delete.
 *     responses:
 *       200:
 *         description: Tag deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Tag not found.
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

    await db.tag.delete({ where: { id } });
    
    return createResponse({
      success: true,
      message: "Tag deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Tag");
  }
}
