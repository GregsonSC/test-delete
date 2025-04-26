import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

const validState = ["AVAILABLE", "INACTIVE", "ASSIGNED"];
const validArea = [
  "BACKEND",
  "FRONTEND",
  "DESIGN",
  "MANAGEMENT",
  "ADMINISTRATIVE",
  "MARKETING",
  "SALES",
  "DEVOPS",
  "SUPPORT",
];
/**
 * @swagger
 * /api/workteam:
 *   post:
 *     tags:
 *       - WorkTeam
 *     summary: Create a new WorkTeam
 *     description: Create a new WorkTeam with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - state
 *               - area
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the work team.
 *                 example: Backend Team
 *               description:
 *                 type: string
 *                 description: Description of the work team.
 *                 example: Responsible for building backend APIs and services.
 *               state:
 *                 type: string
 *                 description: State of the work team. Must be one of the valid options.
 *                 example: AVAILABLE
 *               area:
 *                 type: string
 *                 description: Area assigned to the work team. Must be one of the valid options.
 *                 example: BACKEND
 *     responses:
 *       201:
 *         description: WorkTeam created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: The created work team object.
 *                 message:
 *                   type: string
 *                   example: WorkTeam created successfully.
 *       400:
 *         description: Bad request, missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid state.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error creating WorkTeam
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */


export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, state, area } = data;

    if (!name || !description) {
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
    if (!validArea.includes(area)) {
      return createResponse({
        success: false,
        message: "Invalid area.",
        errors: [`Area must be one of: ${validArea.join(", ")}`],
        status: 400,
      });
    }

    const newWorkTeam = await db.workTeam.create({ data });

    return createResponse({
      success: true,
      data: newWorkTeam,
      message: "WorkTeam created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST WorkTeam");
  }
}
/**
 * @swagger
 * /api/workteam:
 *   get:
 *     tags:
 *       - WorkTeam
 *     summary: Retrieve WorkTeams
 *     description: Get a single WorkTeam by ID or retrieve all if no ID is provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the WorkTeam to retrieve.
 *     responses:
 *       200:
 *         description: WorkTeam(s) retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   oneOf:
 *                     - type: object
 *                     - type: array
 *                       items:
 *                         type: object
 *                 message:
 *                   type: string
 *                   example: Workteam retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: WorkTeam not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: WorkTeam not found.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const workteam = await db.workTeam.findMany();
      return createResponse({
        success: true,
        data: workteam,
        message: "workteam retrieved successfully.",
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
    const workteam = await db.workTeam.findUnique({ where: { id } });

    if (!workteam) {
      return createResponse({
        success: false,
        message: "WorkTeam not found.",
        errors: ["No WorkTeam exists with the given ID."],
        status: 404,
      });
    }
    return createResponse({
      success: true,
      data: workteam,
      message: "Workteam retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET WorkTeam");
  }
}
/**
 * @swagger
 * /api/workteam:
 *   patch:
 *     tags:
 *       - WorkTeam
 *     summary: Update a WorkTeam
 *     description: Update a WorkTeam by ID with the provided data.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the WorkTeam to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               description:
 *                 type: string
 *                 example: Updated description.
 *               state:
 *                 type: string
 *                 example: datos
 *               area:
 *                 type: string
 *                 example: datos
 *     responses:
 *       200:
 *         description: WorkTeam updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 *                   example: WorkTeam updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: WorkTeam not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: WorkTeam not found.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
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
    if (data.area) {
      if (!validArea.includes(data.area)) {
        return createResponse({
          success: false,
          message: "Invalid area.",
          errors: [`Area must be one of: ${validArea.join(", ")}`],
          status: 400,
        });
      }
    }

    const workteam = await db.workTeam.findUnique({ where: { id } });
    if (!workteam) {
      return createResponse({
        success: false,
        message: "WorkTeam not found.",
        errors: ["No workTeam exists with the given ID."],
        status: 404,
      });
    }

    const updateWorkTeam = await db.workTeam.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateWorkTeam,
      message: "WorkTeam updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH WorkTeam");
  }
}
/**
 * @swagger
 * /api/workteam:
 *   delete:
 *     tags:
 *       - WorkTeam
 *     summary: Delete a WorkTeam
 *     description: Delete a WorkTeam by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the WorkTeam to delete.
 *     responses:
 *       200:
 *         description: WorkTeam deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: WorkTeam deleted successfully.
 *       400:
 *         description: Invalid ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error deleting WorkTeam
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
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
    await db.workTeam.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "workteam deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE WorkTeam");
  }
}
