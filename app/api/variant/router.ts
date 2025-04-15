import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/variants
 * @desc Crear un nuevo rol
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Variant name is required",
          errors: ["Missing 'name' field"],
        },
        { status: 400 }
      );
    }

    const newVariant = await db.variant.create({ data });

    return NextResponse.json(
      {
        success: true,
        data: [newVariant],
        message: "Variant created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating variant:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating variant",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route GET /api/variants
 * @desc Obtener todos los variants o uno específico por id (?id=)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const variants = await db.variant.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          benefits: true,
          price: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: variants,
        message: "Variants fetched successfully",
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

    const variant = await db.variant.findUnique({ where: { id } });

    if (!variant) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Variant not found",
          errors: ["Variant does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [variant],
        message: "Variant fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching variant",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route PATCH /api/variants?id={id}
 * @desc Actualizar un rol parcialmente
 */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "No data provided",
          errors: ["Missing request body"],
        },
        { status: 400 }
      );
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The ID must be a valid number",
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const variant = await db.variant.findUnique({ where: { id } });

    if (!variant) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Variant not found",
          errors: ["Variant does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedVariant = await db.variant.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: [updatedVariant],
      message: "Variant updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating variant:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating variant",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/variants?id={id}
 * @desc Eliminar un rol por ID
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const variantExists = await db.variant.findUnique({ where: { id } });

    if (!variantExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Variant not found",
          errors: ["Variant does not exist"],
        },
        { status: 404 }
      );
    }

    const variant = await db.variant.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [variant],
        message: "Variant deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting variant:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting variant",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
