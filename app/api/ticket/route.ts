import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/tickets
 * @desc Crear un nuevo ticket
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.title) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Ticket title is required",
          errors: ["Missing 'title' field"],
        },
        { status: 400 }
      );
    }

    const newTicket = await db.ticket.create({ data });

    return NextResponse.json(
      {
        success: true,
        data: [newTicket],
        message: "Ticket created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating ticket",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route GET /api/tickets
 * @desc Obtener todos los ticket o uno específico por ID (?id=)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const tickets = await db.ticket.findMany({
        select: {
          id: true,
          title: true,
          type: true,
          description: true,
          status: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: tickets,
        message: "Tickets fetched successfully",
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

    const ticket = await db.ticket.findUnique({ where: { id } });

    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Ticket not found",
          errors: ["Ticket with given ID does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [ticket],
        message: "ticket fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching ticket",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route PATCH /api/tickets?id={id}
 * @desc Actualizar un ticket parcialmente
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

    const ticket = await db.ticket.findUnique({ where: { id } });
    if (!ticket) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Ticket not found",
          errors: ["Ticket does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedTicket = await db.ticket.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      data: [updatedTicket],
      message: "Ticket updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating ticket",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/tickets?id={id}
 * @desc Eliminar un ticket por ID
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const ticketExists = await db.ticket.findUnique({ where: { id } });

    if (!ticketExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "ticket not found",
          errors: ["No ticket found with that ID"],
        },
        { status: 404 }
      );
    }

    const deletedTicket = await db.ticket.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [deletedTicket],
        message: "Ticket deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting ticket",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
