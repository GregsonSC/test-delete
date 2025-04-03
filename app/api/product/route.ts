import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { request } from "http";

//Insert New Product
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json({ message: "product name is required" }, { status: 400 });
    }
    const newProduct = await db.product.create({
      data,
    });
    if (newProduct) {
      return NextResponse.json(newProduct, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating Product:", error);
    return NextResponse.json({ message: "Error creating Product", error }, { status: 500 });
  }
}
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
          url:true
        },
      });
      return NextResponse.json(products);
    }
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ message: "The id must be a valid number" }, { status: 400 });
    }
    const product = await db.product.findUnique({
      where: { id },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching product",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }

    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Actualiza solo los campos proporcionados en `data`
    const updatedProduct = await db.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);

    const productExists = await db.product.findUnique({ where: { id } });

    if (!productExists) {
      return NextResponse.json({ message: "product not found" }, { status: 404 });
    }

    const product = await db.product.delete({ where: { id } });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return NextResponse.json({ message: "Error deleting product", error }, { status: 500 });
  }
}


