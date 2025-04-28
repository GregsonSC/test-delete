import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * /api/cost:
 *   post:
 *     tags:
 *       - Cost
 *     summary: Crear un nuevo costo
 *     description: Crea un costo con los datos enviados en el body.
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
 *               type:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       201:
 *         description: Costo creado exitosamente
 *       400:
 *         description: Nombre del costo es requerido
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
          message: "Cost name is required",
          errors: ["Missing 'name' field"],
        },
        { status: 400 }
      );
    }

    const newCost = await db.cost.create({ data, include: { estimate: true } });

    return NextResponse.json(
      {
        success: true,
        data: [newCost],
        message: "Cost created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating cost:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating cost",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cost:
 *   get:
 *     tags:
 *       - Cost
 *     summary: Obtener costos
 *     description: Obtiene todos los costos o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del costo (opcional)
 *     responses:
 *       200:
 *         description: Costos obtenidos exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Costo no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const costs = await db.cost.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          type: true,
          value: true,
          estimate: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: costs,
        message: "Costs fetched successfully",
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

    const cost = await db.cost.findUnique({ where: { id }, include: { estimate: true } });

    if (!cost) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Cost not found",
          errors: ["Cost with given ID does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [cost],
        message: "Cost fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching cost",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cost:
 *   patch:
 *     tags:
 *       - Cost
 *     summary: Actualizar un costo
 *     description: Actualiza parcialmente un costo por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del costo a actualizar
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
 *               type:
 *                 type: string
 *               value:
 *                 type: number
 *     responses:
 *       200:
 *         description: Costo actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Costo no encontrado
 *       500:
 *         description: Error del servidor
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
          errors: ["Empty body"],
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
          errors: ["Invalid or missing ID"],
        },
        { status: 400 }
      );
    }

    const cost = await db.cost.findUnique({ where: { id }, include: { estimate: true } });

    if (!cost) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Cost not found",
          errors: ["Cost does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedCost = await db.cost.update({
      where: { id },
      data,
      include: { estimate: true }
    });

    return NextResponse.json({
      success: true,
      data: [updatedCost],
      message: "Cost updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating cost:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating cost",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/cost:
 *   delete:
 *     tags:
 *       - Cost
 *     summary: Eliminar un costo
 *     description: Elimina un costo existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del costo a eliminar
 *     responses:
 *       200:
 *         description: Costo eliminado exitosamente
 *       404:
 *         description: Costo no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);

    const costExists = await db.cost.findUnique({ where: { id } });

    if (!costExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Cost not found",
          errors: ["No cost found with that ID"],
        },
        { status: 404 }
      );
    }

    const deletedCost = await db.cost.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [deletedCost],
        message: "Cost deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cost:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting cost",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
