import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";

const validName = ["ANALYSIS", "DESIGN", "DEVELOPMENT", "DEPLOY"];
const validState = ["PLANNING", "INPROCESS", "TESTING", "FINISHED"];
/**
 * @route POST /api/phase
 * @desc Crear una nueva fase
 * @swagger
 * /api/phase:
 *   post:
 *     tags:
 *       - Phase
 *     summary: Create a new Phase
 *     description: Creates a new phase with all required fields and valid name and state.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - expectedDuration
 *               - startDate
 *               - endDate
 *               - state
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [ANALYSIS, DESIGN, DEVELOPMENT, DEPLOY]
 *               description:
 *                 type: string
 *               expectedDuration:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-05-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-06-01
 *               state:
 *                 type: string
 *                 enum: [PLANNING, INPROCESS, TESTING, FINISHED]
 *     responses:
 *       201:
 *         description: Phase created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, expectedDuration, startDate, endDate, state } = data;

    if (!name || !description || !expectedDuration || !startDate || !endDate || !state) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
        status: 400,
      });
    }
    if (!validName.includes(name)) {
      return createResponse({
        success: false,
        message: "Invalid name.",
        errors: [`Name must be one of: ${validName.join(", ")}`],
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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for startDate and endDate."],
        status: 400,
      });
    }

    const newPhase = await db.phase.create({ data });

    return createResponse({
      success: true,
      data: newPhase,
      message: "Phase created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Phase");
  }
}
/**
 * @route GET /api/phase
 * @desc Obtener una o todas las fases
 * @swagger
 * /api/phase:
 *   get:
 *     tags:
 *       - Phase
 *     summary: Get one or all Phases
 *     description: Retrieve all phases or a single phase by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the phase to retrieve.
 *     responses:
 *       200:
 *         description: Phase(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Phase not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const phases = await db.phase.findMany();
      return createResponse({
        success: true,
        data: phases,
        message: "Phases retrieved successfully.",
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

    const phase = await db.phase.findUnique({ where: { id } });
    if (!phase) {
      return createResponse({
        success: false,
        message: "Phase not found.",
        errors: ["No Phase exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: phase,
      message: "Phase retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Phase");
  }
}
/**
 * @route PATCH /api/phase
 * @desc Actualizar una fase existente
 * @swagger
 * /api/phase:
 *   patch:
 *     tags:
 *       - Phase
 *     summary: Update a Phase
 *     description: Update one or more fields of a phase by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the phase to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [ANALYSIS, DESIGN, DEVELOPMENT, DEPLOY]
 *               description:
 *                 type: string
 *               expectedDuration:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               state:
 *                 type: string
 *                 enum: [PLANNING, INPROCESS, TESTING, FINISHED]
 *     responses:
 *       200:
 *         description: Phase updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *       404:
 *         description: Phase not found.
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

    if (
      (data.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.startDate)) ||
      (data.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.endDate))
    ) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Invalid startDate format. Use YYYY-MM-DD."],
        status: 400,
      });
    }
    if (data.name) {
      if (!validName.includes(data.name)) {
        return createResponse({
          success: false,
          message: "Invalid name.",
          errors: [`Name must be one of: ${validName.join(", ")}`],
          status: 400,
        });
      }
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

    const phase = await db.phase.findUnique({ where: { id } });
    if (!phase) {
      return createResponse({
        success: false,
        message: "Phase not found.",
        errors: ["No phase exists with the given ID."],
        status: 404,
      });
    }

    const updatedPhase = await db.phase.update({ where: { id }, data: { ...data } });

    return createResponse({
      success: true,
      data: updatedPhase,
      message: "Phase updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Phase");
  }
}
/**
 * @route DELETE /api/phase
 * @desc Eliminar una fase
 * @swagger
 * /api/phase:
 *   delete:
 *     tags:
 *       - Phase
 *     summary: Delete a Phase
 *     description: Delete a phase by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the phase to delete.
 *     responses:
 *       200:
 *         description: Phase deleted successfully.
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
        errors: ["The id must be a valid number."],
        status: 400,
      });
    }

    await db.phase.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Phase deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Phase");
  }
}
