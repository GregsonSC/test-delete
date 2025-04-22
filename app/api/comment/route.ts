import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

/**
 * @route POST /api/comments
 * @desc Crear un nuevo comentario
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
 * @route GET /api/comments
 * @desc Obtener todos los comentarios o uno específico por ID (?id=)
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
 * @route PATCH /api/comments?id={id}
 * @desc Actualizar un comentario parcialmente
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
 * @route DELETE /api/comments?id={id}
 * @desc Eliminar un comentario por ID
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
