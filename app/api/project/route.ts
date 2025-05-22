import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";

import { CurrentPhase } from "@prisma/client";
import { createImage } from "../cloudinary/upload/route";

import { authMiddleware } from "@/middleware/SecureJWT-middleware";
import { NextRequest } from "next/server";

const validCurrentPhase = ["ANALYSIS", "DESIGN", "DEVELOPMENT", "DEPLOY"];
/**
 * @swagger
 * tags:
 *   - name: Project
 *     description: When a client pays the invoice corresponding to the request they made to acquire a company service, it formally becomes a project. A work team is assigned to it, and its various phases begin to be developed.
 * /api/project:
 *   post:
 *     tags:
 *       - Project
 *     summary: Create a new project
 *     description: Create a new project with name, description, duration, dates, current phase, image preview, and related estimate ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - expectedDuration
 *               - startDate
 *               - endDate
 *               - currentPhase
 *               - imagePreviewUrl
 *               - estimate_id
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
 *               imagePreviewUrl:
 *                 type: string
 *                 format: binary
 *               estimate_id:
 *                 type: integer
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
    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const expectedDuration = formData.get("expectedDuration")?.toString();
    const startDate = formData.get("startDate")?.toString();
    const endDate = formData.get("endDate")?.toString().trim() || "";

    const estimate_id = formData.get("estimate_id")
      ? parseInt(formData.get("estimate_id")!.toString(), 10)
      : undefined;
    const imagePreviewFile = formData.get("imagePreviewUrl");

    let imagePreviewUrl: string | undefined = "";

    if (imagePreviewFile) {
      if (!(imagePreviewFile instanceof File)) {
        return createResponse({
          success: false,
          message: "The image must be valid file.",
          errors: ["Must be uploaded as file."],
          status: 400,
        });
      }
      imagePreviewUrl = await createImage(imagePreviewFile);
    }

    // Validate that the Estimate exists
    if (estimate_id) {
      const estimate = await db.estimate.findUnique({ where: { id: estimate_id } });
      if (!estimate) {
        return createResponse({ success: false, message: "Estimate not found.", status: 400 });
      }
    }

    if (!name || !description || !expectedDuration || !startDate) {
      return createResponse({
        success: false,
        message: "All required fields must be provided.",
        errors: ["The fields 'name', 'description', 'expectedDuration', and 'startDate' are required and cannot be empty."],
        status: 400,
      });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for startDate."],
        status: 400,
      });
    }
    if (endDate) {
      if (!dateRegex.test(endDate)) {
        return createResponse({
          success: false,
          message: "Invalid date format.",
          errors: ["Use YYYY-MM-DD format for endDate."],
          status: 400,
        });
      }
    }

    const newProject = await db.project.create({
      data: {
        name,
        description,
        expectedDuration,
        startDate,
        endDate,
        imagePreviewUrl,
        estimate_id,
      },
    });

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
 * @swagger
 * /api/project:
 *   patch:
 *     tags:
 *       - Project
 *     summary: Update an existing project
 *     description: >
 *       Actualiza un proyecto existente según su ID. Al menos un campo debe ser enviado.
 *
 *       - Los campos `startDate` y `endDate` deben tener formato `YYYY-MM-DD`.
 *       - El campo `currentPhase` debe tener uno de los siguientes valores permitidos:
 *         ANALYSIS, DESIGN, DEVELOPMENT, DEPLOY.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del proyecto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Website Redesign"
 *               description:
 *                 type: string
 *                 example: "Redesigning the homepage and about section"
 *               expectedDuration:
 *                 type: string
 *                 example: "3 months"
 *               startDate:
 *                 type: string
 *                 example: "2025-06-01"
 *               endDate:
 *                 type: string
 *                 example: "2025-09-01"
 *               currentPhase:
 *                 type: string
 *                 example: DEVELOPMENT
 *               imagePreviewUrl:
 *                 type: string
 *                 format: binary
 *               estimate_id:
 *                 type: integer
 *                 example: 12
 *     responses:
 *       200:
 *         description: Project updated successfully.
 *       400:
 *         description: Validation error or no data provided.
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Server error while updating the project.
 */

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    if (!requestId || isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }

    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const expectedDuration = formData.get("expectedDuration")?.toString();
    const startDate = formData.get("startDate")?.toString();
    const endDate = formData.get("endDate")?.toString();
    const currentPhase = formData.get("currentPhase")?.toString();

    const imageFile = formData.get("imagePreviewUrl");
    const imagePreviewUrl = imageFile instanceof File ? await createImage(imageFile) : undefined;

    const estimate_id = formData.get("estimate_id")
      ? parseInt(formData.get("estimate_id")!.toString(), 10)
      : undefined;

    // Validate that the Estimate exists
    if (estimate_id) {
      const estimate = await db.estimate.findUnique({ where: { id: estimate_id } });
      if (!estimate) {
        return createResponse({ success: false, message: "Estimate not found.", status: 400 });
      }
    }
    if (
      !name &&
      !description &&
      !expectedDuration &&
      !startDate &&
      !endDate &&
      !currentPhase &&
      !imagePreviewUrl &&
      !estimate_id
    ) {
      return createResponse({
        success: false,
        message: "No data provided.",
        errors: ["At least one field must be provided to update."],
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

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if ((startDate && !dateRegex.test(startDate)) || (endDate && !dateRegex.test(endDate))) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for startDate and endDate."],
        status: 400,
      });
    }

    if (currentPhase && !validCurrentPhase.includes(currentPhase)) {
      return createResponse({
        success: false,
        message: "Invalid current phase.",
        errors: [`Current phase must be one of: ${validCurrentPhase.join(", ")}`],
        status: 400,
      });
    }

    const updatedProject = await db.project.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(expectedDuration && { expectedDuration }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(currentPhase && { currentPhase: currentPhase as CurrentPhase }),
        ...(imagePreviewUrl && { imagePreviewUrl }),
        ...(estimate_id && { estimate_id }),
      },
    });

    return createResponse({
      success: true,
      data: updatedProject,
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
