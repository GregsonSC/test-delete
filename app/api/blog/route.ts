import { NextResponse } from "next/server";
import db from "@/lib/prisma";

// Función reutilizable para respuestas
function createResponse({
  success,
  data = null,
  message,
  errors = [],
}: {
  success: boolean;
  data?: any;
  message: string;
  errors?: string[];
}) {
  return NextResponse.json({ success, data, message, errors });
}

// Manejo centralizado de errores
function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:`, error);
  return createResponse({
    success: false,
    message: `An error occurred in ${context}.`,
    errors: [error instanceof Error ? error.message : "Unknown error"],
  });
}

// POST - Crear blog
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, resume, content, topic, publicationDate, imageUrl } = data;

    // Validaciones básicas
    if (!title || !resume || !content || !topic || !publicationDate || !imageUrl) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
      });
    }

    // Validar formato de fecha
    if (!/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for the publicationDate."],
      });
    }

    const newBlog = await db.blog.create({ data });

    return createResponse({
      success: true,
      data: newBlog,
      message: "Blog created successfully.",
    });
  } catch (error) {
    return handleError(error, "POST Blog");
  }
}

// GET - Obtener blog(s)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const blogs = await db.blog.findMany();
      return createResponse({
        success: true,
        data: blogs,
        message: "Blogs retrieved successfully.",
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
      });
    }

    const blog = await db.blog.findUnique({ where: { id } });

    if (!blog) {
      return createResponse({
        success: false,
        message: "Blog not found.",
        errors: ["No blog exists with the given ID."],
      });
    }

    return createResponse({
      success: true,
      data: blog,
      message: "Blog retrieved successfully.",
    });
  } catch (error) {
    return handleError(error, "GET Blog");
  }
}

// PATCH - Actualizar blog
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);
    const data = await request.json();

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
      });
    }

    if (data.publicationDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.publicationDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for the publicationDate."],
      });
    }

    const blog = await db.blog.findUnique({ where: { id } });

    if (!blog) {
      return createResponse({
        success: false,
        message: "Blog not found.",
        errors: ["No blog exists with the given ID."],
      });
    }

    const updateBlog = await db.blog.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateBlog,
      message: "Blog updated successfully.",
    });
  } catch (error) {
    return handleError(error, "PATCH Blog");
  }
}

// DELETE - Eliminar blog
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
      });
    }

    await db.blog.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    return handleError(error, "DELETE Blog");
  }
}
