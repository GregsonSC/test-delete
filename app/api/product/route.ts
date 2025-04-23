import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * /api/product:
 *   post:
 *     tags:
 *       - Product
 *     summary: Crear un nuevo producto
 *     description: Crea un producto con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Nombre del producto es requerido
 *       500:
 *         description: Error del servidor
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Product name is required",
        errors: ["Missing 'name' field"]
      }, { status: 400 });
    }

    const newProduct = await db.product.create({ data });

    return NextResponse.json({
      success: true,
      data: [newProduct],
      message: "Product created successfully",
      errors: []
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error creating product",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
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

      return NextResponse.json({
        success: true,
        data: products,
        message: "Products fetched successfully",
        errors: []
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "The id must be a valid number",
        errors: ["Invalid ID"]
      }, { status: 400 });
    }

    const product = await db.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Product not found",
        errors: ["Product with given ID does not exist"]
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: [product],
      message: "Product fetched successfully",
      errors: []
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error fetching product",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/product:
 *   patch:
 *     tags:
 *       - Product
 *     summary: Actualizar un producto
 *     description: Actualiza parcialmente un producto por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto a actualizar
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
 *               url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "No data provided",
        errors: ["Empty body"]
      }, { status: 400 });
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "The ID must be a valid number",
        errors: ["Invalid or missing ID"]
      }, { status: 400 });
    }

    const product = await db.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "Product not found",
        errors: ["Product does not exist"]
      }, { status: 404 });
    }

    const updatedProduct = await db.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: [updatedProduct],
      message: "Product updated successfully",
      errors: []
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error updating product",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
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
      return NextResponse.json({
        success: false,
        data: [],
        message: "Product not found",
        errors: ["No product found with that ID"]
      }, { status: 404 });
    }

    const deletedProduct = await db.product.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: [deletedProduct],
      message: "Product deleted successfully",
      errors: []
    }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({
      success: false,
      data: [],
      message: "Error deleting product",
      errors: [error instanceof Error ? error.message : "Unknown error"]
    }, { status: 500 });
  }
}



