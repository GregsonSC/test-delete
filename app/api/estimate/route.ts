import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { authMiddleware } from "@/middleware/SecureJWT-middleware";
import { NextRequest } from "next/server";
const validState = ["CREATED", "PROCESSING", "INREVIEW", "REJECTED", "ACCEPTED", "INVOICE", "PAID"];
/**
 * @swagger
 * tags:
 *   - name: Estimate
 *     description: Set of costs required for the execution of a project. An estimate that has been approved by the client becomes an invoice, and will therefore be displayed in the Invoices section.
 * /api/estimate:
 *   post:
 *     tags:
 *       - Estimate
 *     summary: Create a new estimate
 *     description: Create a new estimate with estimatedTime, description, state, totalValue and optional lead_id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estimatedTime
 *               - description
 *               - state
 *               - totalValue
 *             properties:
 *               estimatedTime:
 *                 type: integer
 *               description:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [CREATED, PROCESSING, INREVIEW, REJECTED, ACCEPTED, INVOICE, PAID]
 *               totalValue:
 *                 type: number
 *               lead_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Estimate created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { estimatedTime, description, state, lead_id, totalValue } = data;

    if (!estimatedTime || !description || !state || !totalValue) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    if (!validState.includes(state)) {
      return createResponse({
        success: false,
        message: "Invalid state.",
        errors: [`State must be one of: ${validState.join(", ")}`],
        status: 400,
      });
    }

    if (isNaN(totalValue) || typeof totalValue !== "number") {
      return createResponse({
        success: false,
        message: "Invalid totalValue.",
        errors: ["totalValue must be a decimal number."],
        status: 400,
      });
    }

    const newEstimate = await db.estimate.create({ data });

    return createResponse({
      success: true,
      data: newEstimate,
      message: "Estimate created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST estimate");
  }
}

/**
 * @route GET /api/estimate
 * @desc Obtener una o todas las estimaciones
 * @swagger
 * /api/estimate:
 *   get:
 *     tags:
 *       - Estimate
 *     summary: Get one or all estimates
 *     description: Returns all estimates or a specific one by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the estimate to retrieve.
 *     responses:
 *       200:
 *         description: Estimate(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       404:
 *         description: Estimate not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: NextRequest) {
  // Validar el token JWT antes de continuar
  const auth = authMiddleware(req);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const estimates = await db.estimate.findMany();
      return createResponse({
        success: true,
        data: estimates,
        message: "Estimates retrieved successfully.",
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

    const estimate = await db.estimate.findUnique({ where: { id } });

    if (!estimate) {
      return createResponse({
        success: false,
        message: "Estimate not found.",
        errors: ["No estimate exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: estimate,
      message: "Estimate retrieved successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "GET estimate");
  }
}

/**
 * @route PATCH /api/estimate
 * @desc Actualizar una estimación
 * @swagger
 * /api/estimate:
 *   patch:
 *     tags:
 *       - Estimate
 *     summary: Update an estimate
 *     description: Update fields of an estimate by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the estimate to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estimatedTime:
 *                 type: integer
 *               description:
 *                 type: string
 *               state:
 *                 type: string
 *                 enum: [CREATED, PROCESSING, INREVIEW, REJECTED, ACCEPTED, INVOICE, PAID]
 *               totalValue:
 *                 type: number
 *               lead_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estimate updated successfully.
 *       400:
 *         description: Invalid input or empty body.
 *       404:
 *         description: Estimate not found.
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

    if (data.state) {
      if (!validState.includes(data.state)) {
        return createResponse({
          success: false,
          message: "Invalid state.",
          errors: [`State must be one of: ${validState.join(", ")}`],
          status: 400,
        });
      }
    }

    const estimate = await db.estimate.findUnique({ where: { id } });

    if (!estimate) {
      return createResponse({
        success: false,
        message: "Estimate not found.",
        errors: ["No estimate exists with the given ID."],
        status: 404,
      });
    }

    const updateEstimate = await db.estimate.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateEstimate,
      message: "Estimate updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH estimate");
  }
}

/**
 * @route DELETE /api/estimate
 * @desc Eliminar una estimación
 * @swagger
 * /api/estimate:
 *   delete:
 *     tags:
 *       - Estimate
 *     summary: Delete an estimate
 *     description: Delete an estimate by ID. Fails if it has related projects.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the estimate to delete.
 *     responses:
 *       200:
 *         description: Estimate deleted successfully.
 *       400:
 *         description: Invalid ID or estimate has related projects.
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
        errors: ["The id must be a valid number."],
        status: 400,
      });
    }

    const relatedProjects = await db.project.findMany({
      where: { estimate_id: id },
    });

    if (relatedProjects.length > 0) {
      return createResponse({
        success: false,
        message: "Estimate has related projects.",
        errors: ["Cannot delete estimate because it is associated with projects."],
        status: 400,
      });
    }

    await db.estimate.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Estimate deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE estimate");
  }
}
