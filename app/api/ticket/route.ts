import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   - name: Ticket
 *     description: Request made by a client or a company member to resolve an issue, error, or problem related to internal processes.
 * /api/ticket:
 *   post:
 *     tags:
 *       - Ticket
 *     summary: Crear un nuevo ticket
 *     description: Crea un ticket con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket creado exitosamente
 *       400:
 *         description: Título del ticket es requerido
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
 * @swagger
 * /api/ticket:
 *   get:
 *     tags:
 *       - Ticket
 *     summary: Obtener tickets
 *     description: Obtiene todos los tickets o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del ticket (opcional)
 *     responses:
 *       200:
 *         description: Tickets obtenidos exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error del servidor
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
 * @swagger
 * /api/ticket:
 *   patch:
 *     tags:
 *       - Ticket
 *     summary: Actualizar un ticket
 *     description: Actualiza parcialmente un ticket por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ticket a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ticket actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Ticket no encontrado
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
 * @swagger
 * /api/ticket:
 *   delete:
 *     tags:
 *       - Ticket
 *     summary: Eliminar un ticket
 *     description: Elimina un ticket existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del ticket a eliminar
 *     responses:
 *       200:
 *         description: Ticket eliminado exitosamente
 *       404:
 *         description: Ticket no encontrado
 *       500:
 *         description: Error del servidor
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
