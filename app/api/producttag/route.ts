import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
/**
 * @swagger
 * /api/producttag:
 *   post:
 *     tags:
 *       - ProductTag
 *     summary: Create a new ProductTag
 *     description: Associates a tag with a product by creating a ProductTag entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *               - tag_id
 *             properties:
 *               product_id:
 *                 type: integer
 *                 example: 1
 *               tag_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: ProductTag created successfully.
 *       400:
 *         description: Missing one or more required fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { product_id, tag_id } = data;

    if (!product_id || !tag_id) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }
    
    // Validate that the product exists
    const product = await db.product.findUnique({ where: { id: product_id } });
    if (!product) {
      return createResponse({ success: false, message: "Product not found.", status: 400 });
    }
    // Validate that the tag exists
    const tag = await db.tag.findUnique({ where: { id: tag_id } });
    if (!tag) {
      return createResponse({ success: false, message: "Tag not found.", status: 400 });
    }

    const newProductTag = await db.productTag.create({ data });

    return createResponse({
      success: true,
      data: newProductTag,
      message: "ProductTag created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST ProductTag");
  }
}
/*
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const benefits = await db.benefit.findMany();
      return createResponse({
        success: true,
        data: benefits,
        message: "Benefits retrieved successfully.",
        status: 200,
      });
    }

  } catch (error) {
    return handleError(error, "GET ProductTag");
  }
}
*/
