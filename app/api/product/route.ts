import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/products
 * @desc Crear un nuevo producto
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
 * @route GET /api/products
 * @desc Obtener todos los productos o uno específico por ID (?id=)
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
 * @route PATCH /api/products?id={id}
 * @desc Actualizar un producto parcialmente
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
 * @route DELETE /api/products?id={id}
 * @desc Eliminar un producto por ID
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



