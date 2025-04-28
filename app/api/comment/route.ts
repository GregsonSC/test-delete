import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * /api/comment:
 *   post:
 *     tags:
 *       - Comment
 *     summary: Crear un nuevo comentario
 *     description: Crea un comentario con los datos enviados en el body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               userId:
 *                 type: integer
 *               estimateId:
 *                 type: integer
 *               phaseId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *       400:
 *         description: Contenido del comentario es requerido
 *       500:
 *         description: Error del servidor
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.content) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Comment content is required",
          errors: ["Missing 'content' field"],
        },
        { status: 400 }
      );
    }

    const newComment = await db.comment.create({
      data,
      include: { user: true, estimate: true, phase: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: [newComment],
        message: "Comment created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating comment",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/comment:
 *   get:
 *     tags:
 *       - Comment
 *     summary: Obtener comentarios
 *     description: Obtiene todos los comentarios o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del comentario (opcional)
 *     responses:
 *       200:
 *         description: Comentarios obtenidos exitosamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const comments = await db.comment.findMany({
        select: {
          id: true,
          content: true,
          sendDate: true,
          sendTime: true,
          user: true,
          estimate: true,
          phase: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: comments,
        message: "Comments fetched successfully",
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

    const comment = await db.comment.findUnique({
      where: { id },
      include: { user: true, estimate: true, phase: true },
    });

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Comment not found",
          errors: ["Comment with given ID does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [comment],
        message: "Comment fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching comment",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/comment:
 *   patch:
 *     tags:
 *       - Comment
 *     summary: Actualizar un comentario
 *     description: Actualiza parcialmente un comentario por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Comentario no encontrado
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

    const comment = await db.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Comment not found",
          errors: ["Comment does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedComment = await db.comment.update({
      where: { id },
      data,
      include: { user: true, estimate: true, phase: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedComment],
      message: "Comment updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating comment",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/comment:
 *   delete:
 *     tags:
 *       - Comment
 *     summary: Eliminar un comentario
 *     description: Elimina un comentario existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error del servidor
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const commentExists = await db.comment.findUnique({ where: { id } });

    if (!commentExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Comment not found",
          errors: ["Comment with given ID does not exist"],
        },
        { status: 404 }
      );
    }

    const deletedComment = await db.comment.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [deletedComment],
        message: "Comment deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting comment",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
