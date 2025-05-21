import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { authMiddleware } from "@/middleware/SecureJWT-middleware";
import { NextRequest } from "next/server";
const validState = ["CREATED", "PROCESSING", "INREVIEW", "REJECTED", "ACCEPTED", "INVOICE", "PAID"];
/**
 * @swagger
 * tags:
 *   - name: Estimate
 *     description: A structured breakdown of anticipated costs associated with a project. Once approved by the client, an estimate transitions into an invoice and is managed within the Invoices section.
 * /api/estimate:
 *   post:
 *     tags:
 *       - Estimate
 *     summary: Create a new estimate
 *     description: Register a new estimate including estimated time, detailed description, current state, total monetary value, payment deadline, invoice metadata, and its associated lead and plan.
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
 *               - lead_id
 *               - plan_id
 *               - deadLineToPay
 *               - invoiceDateCreated
 *               - invoiceReference
 *             properties:
 *               estimatedTime:
 *                 type: string
 *                 example: "30"
 *               description:
 *                 type: string
 *                 example: Initial software development estimate
 *               state:
 *                 type: string
 *                 enum: [CREATED, PROCESSING, INREVIEW, REJECTED, ACCEPTED, INVOICE, PAID]
 *                 description: >
 *                   Current state of the estimate. Possible values are:
 *                   - **CREATED**: Estimate has been created but not yet reviewed.
 *                   - **PROCESSING**: Estimate is being processed.
 *                   - **INREVIEW**: Estimate is under client review.
 *                   - **REJECTED**: Estimate has been rejected by the client.
 *                   - **ACCEPTED**: Estimate has been accepted by the client.
 *                   - **INVOICE**: Estimate has been converted to an invoice.
 *                   - **PAID**: Invoice has been paid.
 *               totalValue:
 *                 type: number
 *                 format: float
 *                 example: 15000.50
 *               lead_id:
 *                 type: integer
 *                 example: 2
 *               plan_id:
 *                 type: integer
 *                 example: 1
 *               deadLineToPay:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-30"
 *               invoiceDateCreated:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-12"
 *               invoiceReference:
 *                 type: string
 *                 example: "INV-2025-0456"
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
    const {
      estimatedTime,
      description,
      state,
      lead_id,
      plan_id,
      totalValue,
      deadLineToPay,
      invoiceDateCreated,
      invoiceReference,
    } = data;

    if (
      !estimatedTime ||
      !description ||
      !state ||
      !totalValue /*|| !lead_id || !plan_id*/ ||
      !deadLineToPay ||
      !invoiceDateCreated ||
      !invoiceReference
    ) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }
    // Validate that the Lead exists
    if (lead_id) {
      const lead = await db.lead.findUnique({ where: { id: lead_id } });
      if (!lead) {
        return createResponse({ success: false, message: "Lead not found.", status: 400 });
      }
    }
    // Validate that the Plan exists
    if (plan_id) {
      const plan = await db.plan.findUnique({ where: { id: plan_id } });
      if (!plan) {
        return createResponse({ success: false, message: "Plan not found.", status: 400 });
      }
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
 *     description: Update one or more fields of an estimate by its ID.
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
 *                 example: 45
 *               description:
 *                 type: string
 *                 example: Updated estimate for second sprint
 *               state:
 *                 type: string
 *                 enum: [CREATED, PROCESSING, INREVIEW, REJECTED, ACCEPTED, INVOICE, PAID]
 *                 description: >
 *                   New state of the estimate.
 *               totalValue:
 *                 type: number
 *                 format: float
 *                 example: 20000.75
 *               lead_id:
 *                 type: integer
 *                 example: 3
 *               plan_id:
 *                 type: integer
 *                 example: 2
 *               deadLineToPay:
 *                 type: string
 *                 format: date
 *                 example: "2025-07-15"
 *               invoiceDateCreated:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-10"
 *               invoiceReference:
 *                 type: string
 *                 example: "INV-2025-0499"
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

    // Validate that the Lead exists
    if (data.lead_id) {
      const lead = await db.lead.findUnique({ where: { id: data.lead_id } });
      if (!lead) {
        return createResponse({ success: false, message: "Lead not found.", status: 400 });
      }
    }

    // Validate that the Plan exists
    if (data.plan_id) {
      const plan = await db.plan.findUnique({ where: { id: data.plan_id } });
      if (!plan) {
        return createResponse({ success: false, message: "Plan not found.", status: 400 });
      }
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
    return handleError(error, "PATCH Estimate");
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
