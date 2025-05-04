import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   - name: Plan
 *     description: The company offers a series of packages that allow users to access certain benefits when acquiring their services, such as greater complexity in website development, long-term support, personal brand building, among others. These plans have an associated price, which impacts the costs of an Estimate.
 * /api/plan:
 *   post:
 *     tags:
 *       - Plan
 *     summary: Crear un nuevo plan
 *     description: Crea un plan con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - serviceId
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               serviceId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plan creado exitosamente
 *       400:
 *         description: Campos requeridos faltantes
 *       500:
 *         description: Error del servidor
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name || !data.type || !data.serviceId) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Missing required fields",
          errors: ["'name', 'type', and 'serviceId' are required"],
        },
        { status: 400 }
      );
    }

    const newPlan = await db.plan.create({ data, include: { service: true } });

    return NextResponse.json(
      {
        success: true,
        data: [newPlan],
        message: "Plan created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating plan:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating plan",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/plan:
 *   get:
 *     tags:
 *       - Plan
 *     summary: Obtener planes
 *     description: Obtiene todos los planes o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del plan (opcional)
 *     responses:
 *       200:
 *         description: Planes obtenidos exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Plan no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const plans = await db.plan.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          type: true,
          service: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: plans,
        message: "Plan fetched successfully",
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

    const plan = await db.plan.findUnique({ where: { id }, include: { service: true } });

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Plan not found",
          errors: ["Plan does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [plan],
        message: "Plan fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching plan",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/plan:
 *   patch:
 *     tags:
 *       - Plan
 *     summary: Actualizar un plan
 *     description: Actualiza parcialmente un plan por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               serviceId:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plan actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Plan no encontrado
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

    const plan = await db.plan.findUnique({ where: { id }, include: { service: true } });

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Plan not found",
          errors: ["Plan does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedPlan = await db.plan.update({
      where: { id },
      data,
      include: { service: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedPlan],
      message: "Plan updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating plan",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/plan:
 *   delete:
 *     tags:
 *       - Plan
 *     summary: Eliminar un plan
 *     description: Elimina un plan existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan a eliminar
 *     responses:
 *       200:
 *         description: Plan eliminado exitosamente
 *       404:
 *         description: Plan no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const planExists = await db.plan.findUnique({ where: { id } });

    if (!planExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Plan not found",
          errors: ["Plan does not exist"],
        },
        { status: 404 }
      );
    }

    const plan = await db.plan.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [plan],
        message: "Plan deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting plan:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting plan",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
