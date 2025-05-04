import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

const validState = ["PENDING", "ASSIGNED", "INPROCESS", "REVIEWING", "FINISHED"];
/**
 * @swagger
 * tags:
 *   - name: Activity
 *     description: Task associated with a project phase that describes the activities a user must perform in order to progress. These tasks can be accessed from the Project Board section in the admin panel.
 *
 * /api/activity:
 *   post:
 *     tags:
 *       - Activity
 *     summary: Create a new Activity
 *     description: Creates a new activity with all required fields and a valid state.
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
 *                 enum: [PENDING, ASSIGNED, INPROCESS, REVIEWING, FINISHED]
 *     responses:
 *       201:
 *         description: Activity created successfully.
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

    const newActivity = await db.activity.create({ data });

    return createResponse({
      success: true,
      data: newActivity,
      message: "Activity created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Activity");
  }
}
/**
 * @route GET /api/activity
 * @desc Obtener una o todas las actividades
 * @swagger
 * /api/activity:
 *   get:
 *     tags:
 *       - Activity
 *     summary: Get one or all Activities
 *     description: Retrieve all activities or one by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the activity to retrieve.
 *     responses:
 *       200:
 *         description: Activity or list of activities retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Activity not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const activities = await db.activity.findMany();
      return createResponse({
        success: true,
        data: activities,
        message: "Activities retrieved successfully.",
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

    const activity = await db.activity.findUnique({ where: { id } });
    if (!activity) {
      return createResponse({
        success: false,
        message: "Activity not found.",
        errors: ["No Activity exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: activity,
      message: "Activity retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Activity");
  }
}
/**
 * @route PATCH /api/activity
 * @desc Actualizar una actividad existente
 * @swagger
 * /api/activity:
 *   patch:
 *     tags:
 *       - Activity
 *     summary: Update an Activity
 *     description: Update fields of an existing activity using its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the activity to update.
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
 *                 enum: [PENDING, ASSIGNED, INPROCESS, REVIEWING, FINISHED]
 *     responses:
 *       200:
 *         description: Activity updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *       404:
 *         description: Activity not found.
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
    const activity = await db.activity.findUnique({ where: { id } });
    if (!activity) {
      return createResponse({
        success: false,
        message: "Activity not found.",
        errors: ["No Activity exists with the given ID."],
        status: 404,
      });
    }

    const updateActivity = await db.activity.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateActivity,
      message: "Activity updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Activity");
  }
}
/**
 * @route DELETE /api/activity
 * @desc Eliminar una actividad
 * @swagger
 * /api/activity:
 *   delete:
 *     tags:
 *       - Activity
 *     summary: Delete an Activity
 *     description: Delete an activity by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the activity to delete.
 *     responses:
 *       200:
 *         description: Activity deleted successfully.
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

    await db.activity.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Activity deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Activity");
  }
}
