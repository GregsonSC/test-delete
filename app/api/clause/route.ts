import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";


/**
 * @swagger
 * tags:
 *   - name: Clause
 *     description: Clauses are conditions or provisions in a contract that outline specific requirements or actions.
 * /api/clause:
 *   post:
 *     tags:
 *       - Clause
 *     summary: Crear una nueva cláusula
 *     description: Crea una cláusula con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la cláusula.
 *               description:
 *                 type: string
 *                 description: Descripción detallada de la cláusula.
 *     responses:
 *       201:
 *         description: Cláusula creada exitosamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       500:
 *         description: Error del servidor
 */


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Clause title is required",
          errors: ["Missing 'title' field"],
        },
        { status: 400 }
      );
    }
    if (!data.description) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Clause description is required",
          errors: ["Missing 'description' field"],
        },
        { status: 400 }
      );
    }

    const newClause = await db.clause.create({ data });

    return NextResponse.json(
      {
        success: true,
        data: [newClause],
        message: "Clause created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating clause:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating clause",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/clause:
 *   get:
 *     tags:
 *       - Clause
 *     summary: Obtener cláusulas
 *     description: Obtiene todas las cláusulas o una específica si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID de la cláusula (opcional)
 *     responses:
 *       200:
 *         description: Cláusulas obtenidas exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Cláusula no encontrada
 *       500:
 *         description: Error del servidor
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const clauses = await db.clause.findMany({
        select: {
          id: true,
          title: true,
          description: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: clauses,
        message: "Clauses fetched successfully",
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

    const clause = await db.clause.findUnique({ where: { id } });

    if (!clause) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Clauses not found",
          errors: ["Clauses does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [clause],
        message: "Clauses fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching clause",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}


/**
 * @swagger
 * /api/clause:
 *   patch:
 *     tags:
 *       - Clause
 *     summary: Actualizar una cláusula
 *     description: Actualiza parcialmente una cláusula por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cláusula a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la cláusula.
 *               description:
 *                 type: string
 *                 description: Descripción de la cláusula.
 *     responses:
 *       200:
 *         description: Cláusula actualizada exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Cláusula no encontrada
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

    const clause = await db.clause.findUnique({ where: { id } });

    if (!clause) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Clause not found",
          errors: ["Clause does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedClause = await db.clause.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: [updatedClause],
      message: "Clause updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating clause:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating ",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/clause:
 *   delete:
 *     tags:
 *       - Clause
 *     summary: Eliminar una cláusula
 *     description: Elimina una cláusula existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la cláusula a eliminar
 *     responses:
 *       200:
 *         description: Cláusula eliminada exitosamente
 *       404:
 *         description: Cláusula no encontrada
 *       500:
 *         description: Error del servidor
 */

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const clauseExists = await db.clause.findUnique({ where: { id } });

    if (!clauseExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Clause not found",
          errors: ["Clause does not exist"],
        },
        { status: 404 }
      );
    }

    const clause = await db.clause.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [clause],
        message: "Clause deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting clause:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting clause",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
