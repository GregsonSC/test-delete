import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/plans
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
          message: "Plan name is required",
          errors: ["Missing 'name' field"],
        },
        { status: 400 }
      );
    }

    const newPlan = await db.plan.create({ data });

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
 * @route GET /api/Plans
 * @desc Obtener todos los plans o uno específico por id (?id=)
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
        },
      });

      return NextResponse.json({
        success: true,
        data: plans,
        message: "Plans fetched successfully",
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

    const plan = await db.plan.findUnique({ where: { id } });

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
 * @route PATCH /api/plans?id={id}
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

    const plan = await db.plan.findUnique({ where: { id } });

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
    });

    return NextResponse.json({
      success: true,
      data: [updatedPlan],
      message: " Plan updated successfully",
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
 * @route DELETE /api/plans?id={id}
 * @desc Eliminar un rol por ID
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
