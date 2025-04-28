import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * /api/variant:
 *   post:
 *     tags:
 *       - Variant
 *     summary: Crear una nueva variante
 *     description: Crea una variante con los datos enviados en el body.
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
 *               benefits:
 *                 type: string
 *               price:
 *                 type: number
 *               planId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Variante creada exitosamente
 *       400:
 *         description: Nombre de la variante es requerido
 *       500:
 *         description: Error del servidor
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

    const newVariant = await db.variant.create({ data, include: { plan: true } });

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
 * @swagger
 * /api/variant:
 *   get:
 *     tags:
 *       - Variant
 *     summary: Obtener variantes
 *     description: Obtiene todas las variantes o una específica si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la variante (opcional)
 *     responses:
 *       200:
 *         description: Variantes obtenidas exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Variante no encontrada
 *       500:
 *         description: Error del servidor
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
          plan: true,
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

    const variant = await db.variant.findUnique({ where: { id }, include: { plan: true } });

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
 * @swagger
 * /api/variant:
 *   patch:
 *     tags:
 *       - Variant
 *     summary: Actualizar una variante
 *     description: Actualiza parcialmente una variante por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la variante a actualizar
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
 *               benefits:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Variante actualizada exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Variante no encontrada
 *       500:
 *         description: Error del servidor
 *//**
 * @route PATCH /api/variant?id={id}
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

    const variant = await db.variant.findUnique({
      where: { id },
      include: {
        plan: true,
      },
    });

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
 * @swagger
 * /api/variant:
 *   delete:
 *     tags:
 *       - Variant
 *     summary: Eliminar una variante
 *     description: Elimina una variante existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la variante a eliminar
 *     responses:
 *       200:
 *         description: Variante eliminada exitosamente
 *       404:
 *         description: Variante no encontrada
 *       500:
 *         description: Error del servidor
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
