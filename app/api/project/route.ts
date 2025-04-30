import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";
import { authMiddleware } from "@/middleware/Secure-middleware";
import { NextRequest } from "next/server";

const validCurrentPhase = ["ANALYSIS", "DESIGN", "DEVELOPMENT", "DEPLOY"];
/**
 * @route POST /api/project
 * @desc Crear un nuevo proyecto
 * @swagger
 * /api/project:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create a new project
 *     description: Create a new project with name, description, duration, dates, and current phase.
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
 *               - currentPhase
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               expectedDuration:
 *                 type: integer
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-04-01
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-04-30
 *               currentPhase:
 *                 type: string
 *                 enum: [ANALYSIS, DESIGN, DEVELOPMENT, DEPLOY]
 *     responses:
 *       201:
 *         description: Project created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, expectedDuration, startDate, endDate, currentPhase } = data;

    if (!name || !description || !expectedDuration || !startDate || !endDate || !currentPhase) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
        status: 400,
      });
    }
    if (!validCurrentPhase.includes(currentPhase)) {
      return createResponse({
        success: false,
        message: "Invalid current phase.",
        errors: [`Current phase must be one of: ${validCurrentPhase.join(", ")}`],
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

    const newProject = await db.project.create({ data });

    return createResponse({
      success: true,
      data: newProject,
      message: "Project created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Project");
  }
}
/**
 * @route GET /api/project
 * @desc Obtener uno o todos los proyectos
 * @swagger
 * /api/project:
 *   get:
 *     tags:
 *       - Project
 *     summary: Get one or all projects
 *     description: Returns all projects or one by ID if specified.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the project to retrieve.
 *     responses:
 *       200:
 *         description: Project(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: NextRequest) {
  // Verificar el token JWT
  const auth = authMiddleware(req);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const projects = await db.project.findMany();
      return createResponse({
        success: true,
        data: projects,
        message: "Projects retrieved successfully.",
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

    const project = await db.project.findUnique({ where: { id } });

    if (!project) {
      return createResponse({
        success: false,
        message: "Project not found.",
        errors: ["No project exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: project,
      message: "Project retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Project");
  }
}
/**
 * @route PATCH /api/project
 * @desc Actualizar un proyecto
 * @swagger
 * /api/project:
 *   patch:
 *     tags:
 *       - Project
 *     summary: Update a project
 *     description: Update fields of a project by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to update.
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
 *                 type: integer
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               currentPhase:
 *                 type: string
 *                 enum: [ANALYSIS, DESIGN, DEVELOPMENT, DEPLOY]
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *       400:
 *         description: Invalid input or date format.
 *       404:
 *         description: Project not found.
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
    if (data.currentPhase) {
      if (!validCurrentPhase.includes(data.currentPhase)) {
        return createResponse({
          success: false,
          message: "Invalid current phase.",
          errors: [`Current phase must be one of: ${validCurrentPhase.join(", ")}`],
          status: 400,
        });
      }
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

    const project = await db.project.findUnique({ where: { id } });

    if (!project) {
      return createResponse({
        success: false,
        message: "Project not found.",
        errors: ["No project exists with the given ID."],
        status: 404,
      });
    }

    const updateProject = await db.project.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateProject,
      message: "Project updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Project");
  }
}
/**
 * @route DELETE /api/project
 * @desc Eliminar un proyecto
 * @swagger
 * /api/project:
 *   delete:
 *     tags:
 *       - Project
 *     summary: Delete a project
 *     description: Delete a project by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the project to delete.
 *     responses:
 *       200:
 *         description: Project deleted successfully.
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

    await db.project.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Project deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Project");
  }
}
