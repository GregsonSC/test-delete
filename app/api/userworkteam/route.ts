import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
/**
 * @swagger
 * /api/userworkteam:
 *   post:
 *     tags:
 *       - UserWorkTeam
 *     summary: Associate a user with a work team
 *     description: >
 *       Creates a relationship between a user and a work team. Both `user_id` and `workTeam_id` must correspond to existing records.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - workTeam_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the existing user
 *                 example: 1
 *               workTeam_id:
 *                 type: integer
 *                 description: ID of the existing work team
 *                 example: 2
 *     responses:
 *       201:
 *         description: UserWorkTeam created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Created UserWorkTeam record
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
    const { user_id, workTeam_id } = data;

    if (!user_id || !workTeam_id) {
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
    // Validate that the WorkTeam exists
    const workTeam = await db.workTeam.findUnique({ where: { id: workTeam_id } });
    if (!workTeam) {
      return createResponse({ success: false, message: "WorkTeam not found.", status: 400 });
    }

    const newUserWorkTeam = await db.userWorkTeam.create({ data });
    return createResponse({
      success: true,
      data: newUserWorkTeam,
      message: "UserWorkTeam created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST UserWorkTeam");
  }
}
