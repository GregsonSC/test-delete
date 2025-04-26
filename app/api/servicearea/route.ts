import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";

const validCounty = ["MIAMI_DATE", "BROWARD", "WEST_PALM_BEACH"];
/**
 * @route POST /api/service-area
 * @desc Crear una nueva zona de servicio
 * @swagger
 * /api/service-area:
 *   post:
 *     tags:
 *       - ServiceArea
 *     summary: Create a new ServiceArea
 *     description: Create a new ServiceArea with required fields and a valid county.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - active
 *               - county
 *               - heroImageUrl
 *               - benefitsImageUrl
 *               - testimonialEmbed
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               active:
 *                 type: boolean
 *               county:
 *                 type: string
 *                 enum: [MIAMI_DATE, BROWARD, WEST_PALM_BEACH]
 *               heroImageUrl:
 *                 type: string
 *               benefitsImageUrl:
 *                 type: string
 *               testimonialEmbed:
 *                 type: string
 *               service_id:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: ServiceArea created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const {
      name,
      description,
      active,
      county,
      heroImageUrl,
      benefitsImageUrl,
      testimonialEmbed,
      service_id,
    } = data;

    if (
      !name ||
      !description ||
      active === undefined ||
      !county ||
      !heroImageUrl ||
      !benefitsImageUrl ||
      !testimonialEmbed
      // || !service_id
    ) {
      return createResponse({
        success: false,
        message: "Missing required fields.",
        errors: ["All fields are required."],
        status: 400,
      });
    }
    if (!validCounty.includes(county)) {
      return createResponse({
        success: false,
        message: "Invalid county.",
        errors: [`County must be one of: ${county.join(", ")}`],
        status: 400,
      });
    }
    const newServiceArea = await db.serviceArea.create({ data });

    return createResponse({
      success: true,
      data: newServiceArea,
      message: "ServiceArea created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST ServiceArea");
  }
}
/**
 * @route GET /api/service-area
 * @desc Obtener una o todas las zonas de servicio
 * @swagger
 * /api/service-area:
 *   get:
 *     tags:
 *       - ServiceArea
 *     summary: Get one or all ServiceAreas
 *     description: Retrieve all service areas or a single one by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the ServiceArea to retrieve.
 *     responses:
 *       200:
 *         description: ServiceArea(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: ServiceArea not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const serviceAreas = await db.serviceArea.findMany();
      return createResponse({
        success: true,
        data: serviceAreas,
        message: "ServiceAreas retrieved successfully.",
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

    const serviceArea = await db.serviceArea.findUnique({ where: { id } });

    if (!serviceArea) {
      return createResponse({
        success: false,
        message: "ServiceArea not found.",
        errors: ["No serviceArea exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: serviceArea,
      message: "ServiceArea retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET ServiceArea");
  }
}
/**
 * @route PATCH /api/service-area
 * @desc Actualizar una zona de servicio
 * @swagger
 * /api/service-area:
 *   patch:
 *     tags:
 *       - ServiceArea
 *     summary: Update a ServiceArea
 *     description: Update one or more fields of a ServiceArea by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the ServiceArea to update.
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
 *               active:
 *                 type: boolean
 *               county:
 *                 type: string
 *                 enum: [MIAMI_DATE, BROWARD, WEST_PALM_BEACH]
 *               heroImageUrl:
 *                 type: string
 *               benefitsImageUrl:
 *                 type: string
 *               testimonialEmbed:
 *                 type: string
 *               service_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: ServiceArea updated successfully.
 *       400:
 *         description: Invalid input or ID.
 *       404:
 *         description: ServiceArea not found.
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

    const existingServiceArea = await db.serviceArea.findUnique({ where: { id } });

    if (!existingServiceArea) {
      return createResponse({
        success: false,
        message: "ServiceArea not found.",
        errors: ["No serviceArea exists with the given ID."],
        status: 404,
      });
    }
    if (data.county) {
      if (!validCounty.includes(data.county)) {
        return createResponse({
          success: false,
          message: "Invalid county.",
          errors: [`County must be one of: ${validCounty.join(", ")}`],
          status: 400,
        });
      }
    }

    const updatedServiceArea = await db.serviceArea.update({
      where: { id },
      data,
    });

    return createResponse({
      success: true,
      data: updatedServiceArea,
      message: "ServiceArea updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH ServiceArea");
  }
}
/**
 * @route DELETE /api/service-area
 * @desc Eliminar una zona de servicio
 * @swagger
 * /api/service-area:
 *   delete:
 *     tags:
 *       - ServiceArea
 *     summary: Delete a ServiceArea
 *     description: Delete a ServiceArea by ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the ServiceArea to delete.
 *     responses:
 *       200:
 *         description: ServiceArea deleted successfully.
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

    await db.serviceArea.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "ServiceArea deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE ServiceArea");
  }
}
