import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";
import { County } from "@prisma/client";
import { createImage } from "../cloudinary/upload/route";

const validCounty = ["MIAMI_DATE", "BROWARD", "WEST_PALM_BEACH"];

/**
 * @swagger
 * tags:
 *   - name: ServiceArea
 *     description: Area or locality in the United States where the company currently operates or has operated in the past. Each zone has a dedicated page for each of the company’s services, featuring content specialized for that location.
 * /api/servicearea:
 *   post:
 *     tags:
 *       - ServiceArea
 *     summary: Create a new ServiceArea
 *     description: Create a new ServiceArea with required fields and a valid county. Images must be uploaded as multipart/form-data files.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
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
 *               - mainTitle  # Agregado
 *               - subTitle   # Agregado
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
 *                 format: binary
 *               benefitsImageUrl:
 *                 type: string
 *                 format: binary
 *               testimonialEmbed:
 *                 type: string
 *               service_id:
 *                 type: integer
 *                 nullable: true
 *               mainTitle:  
 *                 type: string
 *               subTitle:   
 *                 type: string
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
    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const county = formData.get("county")?.toString();
    
    const testimonialEmbed = formData.get("testimonialEmbed")?.toString();
    const activeStr = formData.get("active")?.toString();
    
    const service_id = formData.get("service_id")?.toString() ? parseInt(formData.get("service_id")!.toString(), 10) : undefined;

    // Nuevos campos MainTitle y SubTitle
    const mainTitle = formData.get("mainTitle")?.toString();
    const subTitle = formData.get("subTitle")?.toString();
    
    const heroImageFile = formData.get("heroImageUrl");
    const benefitsImageFile = formData.get("benefitsImageUrl");
    
    if (!(heroImageFile instanceof File) || !(benefitsImageFile instanceof File)) {
      return createResponse({
        success: false,
        message: "Both images must be valid files.",
        errors: ["heroImage and benefitsImage must be uploaded as files."],
        status: 400,
      });
    }
    
    const heroImageUrl = await createImage(heroImageFile);
    const benefitsImageUrl = await createImage(benefitsImageFile);
    
    const active = activeStr === "true";

    if (
      !name ||
      !description ||
      activeStr === undefined ||
      !county ||
      !heroImageUrl ||
      !benefitsImageUrl ||
      !testimonialEmbed ||
      !service_id ||
      !mainTitle || // Validación para MainTitle
      !subTitle // Validación para SubTitle
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
        errors: [`County must be one of: ${validCounty.join(", ")}`],
        status: 400,
      });
    }

    const newServiceArea = await db.serviceArea.create({
      data: {
        name,
        description,
        active,
        county: county as County,
        heroImageUrl,
        benefitsImageUrl,
        testimonialEmbed,
        service_id,
        mainTitle, // Agregar MainTitle
        subTitle, // Agregar SubTitle
      },
    });

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
 * @route GET /api/servicearea
 * @desc Obtener una o todas las zonas de servicio
 * @swagger
 * /api/servicearea:
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
 * @swagger
 * /api/servicearea:
 *   patch:
 *     tags:
 *       - ServiceArea
 *     summary: Update a ServiceArea
 *     description: Update one or more fields of a ServiceArea by ID. Fields can be updated via multipart/form-data. At least one field is required.
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
 *         multipart/form-data:
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
 *                 format: binary
 *               benefitsImageUrl:
 *                 type: string
 *                 format: binary
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

    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const county = formData.get("county")?.toString();
    const testimonialEmbed = formData.get("testimonialEmbed")?.toString();
    const activeStr = formData.get("active")?.toString();
    const serviceIdStr = formData.get("service_id")?.toString();

    const heroImageFile = formData.get("heroImageUrl");
    const benefitsImageFile = formData.get("benefitsImageUrl");

    if (county && !validCounty.includes(county)) {
      return createResponse({
        success: false,
        message: "Invalid county.",
        errors: [`County must be one of: ${validCounty.join(", ")}`],
        status: 400,
      });
    }

    const heroImageUrl =heroImageFile instanceof File ? await createImage(heroImageFile) : undefined;
    const benefitsImageUrl =benefitsImageFile instanceof File ? await createImage(benefitsImageFile) : undefined;

    const active = activeStr !== undefined ? activeStr === "true" : undefined;
    const service_id = serviceIdStr ? parseInt(serviceIdStr, 10) : undefined;

    const updatedData: any = {};
    if (name) updatedData.name = name;
    if (description) updatedData.description = description;
    if (county) updatedData.county = county;
    if (testimonialEmbed) updatedData.testimonialEmbed = testimonialEmbed;
    if (active !== undefined) updatedData.active = active;
    if (service_id) updatedData.service_id = service_id;
    if (heroImageUrl) updatedData.heroImageUrl = heroImageUrl;
    if (benefitsImageUrl) updatedData.benefitsImageUrl = benefitsImageUrl;

    if (Object.keys(updatedData).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }

    const updatedServiceArea = await db.serviceArea.update({
      where: { id },
      data: updatedData,
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
 * @route DELETE /api/servicearea
 * @desc Eliminar una zona de servicio
 * @swagger
 * /api/servicearea:
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
