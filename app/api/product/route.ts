import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import { createImage } from "../cloudinary/upload/route";
import { createResponse, handleError } from "@/app/api/utils/handlers";

/**
 * @swagger
 * /api/product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new product
 *     description: Creates a new product by uploading an image and providing name, description and siteUrl.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - siteUrl
 *               - imageUrl
 *             properties:
 *               name:
 *                 type: string
 *                 example: Premium Plan
 *               description:
 *                 type: string
 *                 example: Access to premium features.
 *               siteUrl:
 *                 type: string
 *                 example: https://example.com/product
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error while creating product.
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();

    const name = form.get("name")?.toString();
    const description = form.get("description")?.toString();
    const siteUrl = form.get("siteUrl")?.toString();
    const imageUrlForm = form.get("imageUrl");

    if (!(imageUrlForm instanceof File)) {
      return createResponse({
        success: false,
        message: "The image must be valid file.",
        errors: ["Must be uploaded as file."],
        status: 400,
      });
    }
    const imageUrl = await createImage(imageUrlForm);

    if (!name || !description || !imageUrl || !siteUrl) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "All fields are required.",
          errors: ["Missing one or more required fields."],
        },
        { status: 400 }
      );
    }

    const newProduct = await db.product.create({
      data: { name, description, imageUrl, siteUrl },
    });

    return NextResponse.json(
      {
        success: true,
        data: [newProduct],
        message: "Product created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Product:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating Product",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Obtener productos
 *     description: Obtiene todos los productos paginados o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del producto a obtener (opcional).
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: Índice desde el cual iniciar la paginación. Por defecto es 0.
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       url:
 *                         type: string
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                 page:
 *                   type: object
 *                   properties:
 *                     offset:
 *                       type: integer
 *                     productsPerPage:
 *                       type: integer
 *                     totalProducts:
 *                       type: integer
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const offset = Number(searchParams.get("offset")) || 0;
    const productsPerPage = 2;

    // Get All
    if (!requestId) {
      const [products, totalProducts] = await Promise.all([
        //Promise products
        db.product.findMany({
          skip: offset,
          take: productsPerPage,
          include: {
            ProductTag: {
              include: {
                tag: true,
              },
            },
          },
        }),

        //Promise totalProducts
        db.product.count(),
      ]);

      return NextResponse.json({
        success: true,
        data: products,
        message: "Products fetched successfully",
        errors: [],
        page: {
          offset,
          productsPerPage,
          totalProducts,
        },
      });
    }

    // Get By ID
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The id must be a valid number",
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: { id },
      include: {
        ProductTag: { include: { tag: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Product not found",
          errors: ["Product with given ID does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [product],
        message: "Product fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching product",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * /api/product:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Update a product
 *     description: Updates a product by ID. Accepts name, description, siteUrl, and a new image file. At least one field must be provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Product Name
 *               description:
 *                 type: string
 *                 example: Updated description for the product.
 *               siteUrl:
 *                 type: string
 *                 example: https://example.com/updated-product
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       400:
 *         description: Invalid ID or no data provided.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Server error while updating product.
 */


export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    if (!requestId || isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The ID must be a valid number",
          errors: ["Invalid or missing ID"],
        },
        { status: 400 }
      );
    }

    const form = await request.formData();
    const name = form.get("name")?.toString();
    const description = form.get("description")?.toString();
    const siteUrl = form.get("siteUrl")?.toString();

    const imageUrlForm = form.get("imageUrl");
    const imageUrl = imageUrlForm instanceof File ? await createImage(imageUrlForm) : undefined;

    if (!name && !description && !imageUrl && !siteUrl) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "No data provided",
          errors: ["Empty body"],
        },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Product not found",
          errors: ["Product does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(siteUrl && { siteUrl }),
      },
    });

    return NextResponse.json({
      success: true,
      data: [updatedProduct],
      message: "Product updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating product",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/product:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Eliminar un producto
 *     description: Elimina un producto existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a eliminar
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const productExists = await db.product.findUnique({ where: { id } });

    if (!productExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Product not found",
          errors: ["No product found with that ID"],
        },
        { status: 404 }
      );
    }

    const deletedProduct = await db.product.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [deletedProduct],
        message: "Product deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting product",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
