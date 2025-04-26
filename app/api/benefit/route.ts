import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
/**
 * @route POST /api/benefit
 * @desc Crear un nuevo beneficio
 * @swagger
 * /api/benefit:
 *   post:
 *     tags:
 *       - Benefit
 *     summary: Create a new Benefit
 *     description: Creates a new benefit with the title, description, and serviceAreaId fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               serviceAreaId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Benefit created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

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
/**
 * @route GET /api/benefit
 * @desc Obtener uno o todos los beneficios
 * @swagger
 * /api/benefit:
 *   get:
 *     tags:
 *       - Benefit
 *     summary: Get one or all Benefits
 *     description: Retrieve all benefits or a specific one by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the benefit to retrieve.
 *     responses:
 *       200:
 *         description: Benefit(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Benefit not found.
 *       500:
 *         description: Server error.
 */

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
/**
 * @route PATCH /api/benefit
 * @desc Actualizar un beneficio existente
 * @swagger
 * /api/benefit:
 *   patch:
 *     tags:
 *       - Benefit
 *     summary: Update a Benefit
 *     description: Update one or more fields of a benefit by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the benefit to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               serviceAreaId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Benefit updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *       404:
 *         description: Benefit not found.
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
/**
 * @route DELETE /api/benefit
 * @desc Eliminar un beneficio
 * @swagger
 * /api/benefit:
 *   delete:
 *     tags:
 *       - Benefit
 *     summary: Delete a Benefit
 *     description: Delete a benefit by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the benefit to delete.
 *     responses:
 *       200:
 *         description: Benefit deleted successfully.
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


