import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
/**
 * @swagger
 * /api/useractivity:
 *   post:
 *     tags:
 *       - UserActivity
 *     summary: Associate a user with an activity
 *     description: >
 *       Creates a relationship between a user and an activity. Both `user_id` and `activity_id` must correspond to existing records.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - activity_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the existing user
 *                 example: 1
 *               activity_id:
 *                 type: integer
 *                 description: ID of the existing activity
 *                 example: 5
 *     responses:
 *       201:
 *         description: UserActivity created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Created UserActivity record
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing or invalid fields, or related record not found.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { user_id, activity_id } = data;

    if (!user_id || !activity_id) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    // Validate that the User exists
    const user = await db.user.findUnique({ where: { id: user_id } });
    if (!user) {
      return createResponse({ success: false, message: "User not found.", status: 400 });
    }
    // Validate that the Activity exists
    const activity = await db.activity.findUnique({ where: { id: activity_id } });
    if (!activity) {
      return createResponse({ success: false, message: "Activity not found.", status: 400 });
    }
    const newUserActivity = await db.userActivity.create({ data });
    return createResponse({
      success: true,
      data: newUserActivity,
      message: "UserActivity created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST UserActivity");
  }
}
