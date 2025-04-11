import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/leads
 * @desc Crear un nuevo lead
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.state) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead state is required in capital",
          errors: ["Missing 'state' field"],
        },
        { status: 400 }
      );
    }

    const newLead = await db.lead.create({ data, include: { user: true } });

    return NextResponse.json(
      {
        success: true,
        data: [newLead],
        message: "Lead created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route GET /api/leads
 * @desc Obtener todos los leads o uno específico por ID (?id=)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const leads = await db.lead.findMany({
        select: {
          id: true,
          clientName: true,
          clientEmail: true,
          clientPhone: true,
          name: true,
          state: true,
          starDate: true,
          endDate: true,
          user: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: leads,
        message: "Leads fetched successfully",
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

    const lead = await db.lead.findUnique({ where: { id }, include: { user: true } });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead not found",
          errors: ["Lead does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [lead],
        message: "Lead fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route PATCH /api/leads?id={id}
 * @desc Actualizar un lead parcialmente
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

    const lead = await db.lead.findUnique({ where: { id } });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead not found",
          errors: ["Lead does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedLead = await db.lead.update({
      where: { id },
      data,
      include: { user: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedLead],
      message: "Lead updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/leads?id={id}
 * @desc Eliminar un lead por ID
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const leadExist = await db.lead.findUnique({ where: { id } });

    if (!leadExist) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead not found",
          errors: ["Lead with that ID does not exist"],
        },
        { status: 404 }
      );
    }

    const deletedLead = await db.lead.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [deletedLead],
        message: "Lead deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
