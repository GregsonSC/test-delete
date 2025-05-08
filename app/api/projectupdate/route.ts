import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";


/**
 * @route POST /api/projectupdate
 * @desc Crear un nuevo ProjectUpdate
 * @swagger
 * /api/projectupdate:
 *   post:
 *     tags:
 *       - ProjectUpdate
 *     summary: Create a new ProjectUpdate
 *     description: Create a new ProjectUpdate with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the project update.
 *               content:
 *                 type: string
 *                 description: Content of the project update.
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Date in YYYY-MM-DD format.
 *               projectId:
 *                 type: integer
 *                 nullable: true
 *                 description: Associated project ID.
 *               phaseId:
 *                 type: integer
 *                 nullable: true
 *                 description: Associated phase ID.
 *     responses:
 *       201:
 *         description: ProjectUpdate created successfully.
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
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     title:
 *                       type: string
 *                       example: Finalización de la f de desarrollo
 *                     content:
 *                       type: string
 *                       example: Se completó el desarrollo de todas las funcionalidades clave. El equipo iniciará prueba
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: 2025-04-30
 *                     projectId:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                     phaseId:
 *                       type: integer
 *                       nullable: true
 *                       example: null
 *                 message:
 *                   type: string
 *                   example: ProjectUpdate created successfully.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
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
 *                   example: All fields are required.
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
 *                   example: Error creating ProjectUpdate
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { title, content, date,  phase_id } = data;

        if (!title || !content || !date  || !phase_id) {
            return createResponse({
                success: false,
                message: "All fields are required.",
                errors: ["Missing one or more required fields."],
                status: 400,
            });

        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return createResponse({
              success: false,
              message: "Invalid date format.",
              errors: ["Use YYYY-MM-DD format for the publicationDate."],
              status: 400,
            });
          }
        const newProjectUpdate = await db.projectUpdate.create({ data });
        return createResponse({
            success: true,
            data: newProjectUpdate,
            message: "ProjectUpdate created successfully.",
            status: 201,
        });

    } catch (error) {

        return handleError(error, "POST ProjectUpdate");
    }
}
/**
 * @route GET /api/projectupdate
 * @desc Obtener uno o todos los ProjectUpdates
 * @swagger
 * /api/projectupdate:
 *   get:
 *     tags:
 *       - ProjectUpdate
 *     summary: Retrieve ProjectUpdates
 *     description: Retrieve all ProjectUpdates or a specific one by providing an ID as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the ProjectUpdate to retrieve.
 *     responses:
 *       200:
 *         description: ProjectUpdate(s) retrieved successfully.
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
 *                     - type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           content:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date
 *                           projectId:
 *                             type: integer
 *                             nullable: true
 *                           phaseId:
 *                             type: integer
 *                             nullable: true
 *                     - type: object
 *                       example:
 *                         id: 2
 *                         title: Finalización de la f de desarrollo
 *                         content: Se completó el desarrollo de todas las funcionalidades clave. El equipo iniciará prueba
 *                         date: 2025-04-30
 *                         projectId: null
 *                         phaseId: null
 *                 message:
 *                   type: string
 *                   example: ProjectUpdate retrieved successfully.
 *       400:
 *         description: Invalid ID provided.
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
 *         description: ProjectUpdate not found.
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
 *                   example: ProjectUpdate not found.
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
 *                   example: Error retrieving ProjectUpdate
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
            const projectsUpdate = await db.projectUpdate.findMany();
            return createResponse({
                success: true,
                data: projectsUpdate,
                message: "ProjectsUpdate retrieved successfully.",
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
        const projectUpdate = await db.projectUpdate.findUnique({ where: { id } });
        if (!projectUpdate) {
            return createResponse({
                success: false,
                message: "ProjectUpdate not found.",
                errors: ["No ProjectUpdate exists with the given ID."],
                status: 404,
            });
        }
        return createResponse({
            success: true,
            data: projectUpdate,
            message: "ProjectUpdate retrieved successfully.",
            status: 200,
        });
    } catch (error) {
        return handleError(error, "GET ProjectUpdate");
    }
}

/**
 * @route PATCH /api/projectupdate
 * @desc Actualizar un ProjectUpdate existente
 * @swagger
 * /api/projectupdate:
 *   patch:
 *     tags:
 *       - ProjectUpdate
 *     summary: Update an existing ProjectUpdate
 *     description: Update fields of an existing ProjectUpdate by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the ProjectUpdate to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update (at least one required).
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               projectId:
 *                 type: integer
 *                 nullable: true
 *               phaseId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: ProjectUpdate updated successfully.
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
 *                   example:
 *                     id: 2
 *                     title: Finalización de la f de desarrollo
 *                     content: Se completó el desarrollo de todas las funcionalidades clave. El equipo iniciará prueba
 *                     date: 2025-04-30
 *                     projectId: null
 *                     phaseId: null
 *                 message:
 *                   type: string
 *                   example: ProjectUpdate updated successfully.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid ID or empty update data.
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
 *                   example: No update data provided.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: ProjectUpdate not found.
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
 *                   example: ProjectUpdate not found.
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
 *                   example: Error updating ProjectUpdate
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
        const projectUpdate = await db.projectUpdate.findUnique({ where: { id } });
        if (!projectUpdate) {
            return createResponse({
                success: false,
                message: "ProjectUpdate not found.",
                errors: ["No projectUpdate exists with the given ID."],
                status: 404,
            });
        }
        const updateProjectUpdate = await db.projectUpdate.update({
            where: { id },
            data: { ...data },
        });
        return createResponse({
            success: true,
            data: updateProjectUpdate,
            message: "ProjectUpdate updated successfully.",
            status: 200,
        });

    } catch (error) {
        return handleError(error, "PATCH projectUpdate");
    }
}
/**
 * @route DELETE /api/projectupdate
 * @desc Eliminar un ProjectUpdate por ID
 * @swagger
 * /api/projectupdate:
 *   delete:
 *     tags:
 *       - ProjectUpdate
 *     summary: Delete a ProjectUpdate by ID
 *     description: Delete a ProjectUpdate record by its unique ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the ProjectUpdate to delete.
 *     responses:
 *       200:
 *         description: ProjectUpdate deleted successfully.
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
 *                   example: ProjectUpdate deleted successfully.
 *       400:
 *         description: Invalid ID provided.
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
 *                   example: Error deleting ProjectUpdate
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
  
      await db.projectUpdate.delete({ where: { id } });
  
      return createResponse({
        success: true,
        message: "ProjectUpdate deleted successfully.",
        status: 200,
      });
    } catch (error) {
      return handleError(error, "DELETE ProjectUpdate");
    }
  }
  