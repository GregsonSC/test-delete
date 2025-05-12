import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

/**
 * @route POST /api/studycase
 * @desc Crear un nuevo StudyCase
 * @swagger
 * /api/studycase:
 *   post:
 *     tags:
 *       - StudyCase
 *     summary: Create a new StudyCase
 *     description: Create a new StudyCase with the required data.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - resume
 *               - videoUrl
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Title of the study case."
 *               resume:
 *                 type: string
 *                 description: "Short summary of the study case."
 *               videoUrl:
 *                 type: string
 *                 description: "URL of the video explaining the study case."
 *     responses:
 *       201:
 *         description: StudyCase created successfully.
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
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Análisis de UX
 *                     resume:
 *                       type: string
 *                       example: Evaluación de experiencia de usuario en plataforma bancaria.
 *                     videoUrl:
 *                       type: string
 *                       example: https://videos.com/ux-caso1
 *                 message:
 *                   type: string
 *                   example: StudyCase created successfully.
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
 *                   example: Error creating StudyCase
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const videoUrl = formData.get("videoUrl")?.toString();

    if (!title || !resume || !videoUrl) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    const newStudyCase = await db.studyCase.create({
      data: { title, resume, videoUrl },
    });

    return createResponse({
      success: true,
      data: newStudyCase,
      message: "StudyCase created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST StudyCase");
  }
}
/**
 * @route GET /api/studycase
 * @desc Obtener uno o todos los StudyCases
 * @swagger
 * /api/studycase:
 *   get:
 *     tags:
 *       - StudyCase
 *     summary: Get StudyCases
 *     description: Retrieve all StudyCases or a specific one by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the StudyCase to retrieve.
 *     responses:
 *       200:
 *         description: StudyCases retrieved successfully.
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
 *                             example: 1
 *                           title:
 *                             type: string
 *                             example: Análisis de UX
 *                           resume:
 *                             type: string
 *                             example: Evaluación de experiencia de usuario.
 *                           videoUrl:
 *                             type: string
 *                             example: https://videos.com/ux-caso1
 *                     - type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 2
 *                         title:
 *                           type: string
 *                           example: Caso de UI
 *                         resume:
 *                           type: string
 *                           example: Estudio de interfaces gráficas.
 *                         videoUrl:
 *                           type: string
 *                           example: https://videos.com/ui-caso2
 *                 message:
 *                   type: string
 *                   example: StudyCases retrieved successfully.
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
 *         description: StudyCase not found.
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
 *                   example: StudyCase not found.
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
 *                   example: Error retrieving StudyCase
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
      const studyCases = await db.studyCase.findMany();
      return createResponse({
        success: true,
        data: studyCases,
        message: "StudyCases retrieved successfully.",
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

    const studyCase = await db.studyCase.findUnique({ where: { id } });

    if (!studyCase) {
      return createResponse({
        success: false,
        message: "StudyCase not found.",
        errors: ["No StudyCase exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: studyCase,
      message: "StudyCase retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET StudyCase");
  }
}
/**
 * @route PATCH /api/studycase
 * @desc Actualizar un StudyCase existente
 * @swagger
 * /api/studycase:
 *   patch:
 *     tags:
 *       - StudyCase
 *     summary: Update a StudyCase
 *     description: Update an existing StudyCase by ID. At least one field must be provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the StudyCase to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "New title of the StudyCase."
 *               resume:
 *                 type: string
 *                 description: "New resume of the StudyCase."
 *               videoUrl:
 *                 type: string
 *                 description: "New video URL of the StudyCase."
 *     responses:
 *       200:
 *         description: StudyCase updated successfully.
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
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Nuevo título
 *                     resume:
 *                       type: string
 *                       example: Resumen actualizado
 *                     videoUrl:
 *                       type: string
 *                       example: https://video.com/nuevo-url
 *                 message:
 *                   type: string
 *                   example: Studycase updated successfully.
 *       400:
 *         description: Invalid ID or no data provided for update.
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
 *         description: StudyCase not found.
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
 *                   example: StudyCase not found.
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
 *                   example: Error updating StudyCase
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

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }

    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const videoUrl = formData.get("videoUrl")?.toString();

    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (resume) updatedData.resume = resume;
    if (videoUrl) updatedData.videoUrl = videoUrl;

    if (Object.keys(updatedData).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }
    
    const updatedStudyCase = await db.studyCase.update({
      where: { id },
      data: updatedData,
    });
    
    return createResponse({
      success: true,
      data: updatedStudyCase,
      message: "Studycase updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH StudyCase");
  }
}
/**
 * @route DELETE /api/studycase
 * @desc Eliminar un StudyCase por ID
 * @swagger
 * /api/studycase:
 *   delete:
 *     tags:
 *       - StudyCase
 *     summary: Delete a StudyCase
 *     description: Delete an existing StudyCase by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the StudyCase to delete.
 *     responses:
 *       200:
 *         description: StudyCase deleted successfully.
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
 *                   example: StudyCase deleted successfully.
 *       400:
 *         description: Invalid or missing ID.
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
 *                   example: Error deleting StudyCase
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

    await db.studyCase.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "StudyCase deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE StudyCase");
  }
}

