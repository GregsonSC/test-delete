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
 *     description: Creates a new product by uploading an image and providing name and description.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - url
 *             properties:
 *               name:
 *                 type: string
 *                 example: Premium Plan
 *               description:
 *                 type: string
 *                 example: Access to premium features.
 *               url:
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

    const urlForm = form.get("url");

    if (!(urlForm instanceof File)) {
      return createResponse({
        success: false,
        message: "The image must be valid file.",
        errors: ["Must be uploaded as file."],
        status: 400,
      });
    }
    const url = await createImage(urlForm);

    if (!name || !description || !url) {
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
      data: { name, description, url },
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
    console.error("Error creating product:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating product",
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
 *     description: Obtiene todos los productos o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del producto (opcional)
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const products = await db.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          url: true,
        },
      });
      const Attachment = await db.product.findMany({
        include: {
          Attachment: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: products,
        Attachment,
        message: "Products fetched successfully",
        errors: [],
      });
    }

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

    const product = await db.product.findUnique({ where: { id }, include: { Attachment: true } });

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
 *     description: Updates a product by ID. Accepts name, description, and a new image file. At least one field must be provided.
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
 *               url:
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

    const urlForm = form.get("url");
    const url = urlForm instanceof File ? await createImage(urlForm) : undefined;

    if (!name && !description && !url) {
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
        ...(url && { url }),
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
