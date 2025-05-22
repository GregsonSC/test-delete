import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

/**
 * @swagger
 * /api/service/products:
 *   get:
 *     tags:
 *       - Service
 *     summary: Get Products by Service ID
 *     description: Retrieve all products associated with a specific service.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the service.
 *     responses:
 *       200:
 *         description: Products retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: No products found for this service.
 *       500:
 *         description: Server error.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      return createResponse({
        success: false,
        message: "Missing service ID.",
        errors: ["The 'id' query parameter is required."],
        status: 400,
      });
    }

    const serviceId = Number(requestId);

    if (isNaN(serviceId)) {
      return createResponse({
        success: false,
        message: "Invalid service ID.",
        errors: ["The 'id' must be a valid number."],
        status: 400,
      });
    }

    const products = await db.product.findMany({
      where: { serviceId },
    });

    return createResponse({
      success: true,
      data: products,
      message: "Products retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET Products by Service");
  }
}
