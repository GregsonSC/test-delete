import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

const validTopics = ["WEBDESIGN", "DIGITALMARKETING", "GRAPHICDESIGN"];
// POST - Crear blog
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, resume, content, topic, publicationDate, imageUrl } = data;

    if (!title || !resume || !content || !topic || !publicationDate || !imageUrl) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    if (!validTopics.includes(topic)) {
      return createResponse({
        success: false,
        message: "Invalid topic.",
        errors: [`Topic must be one of: ${validTopics.join(", ")}`],
        status: 400,
      });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for the publicationDate."],
        status: 400,
      });
    }

    const newBlog = await db.blog.create({ data });

    return createResponse({
      success: true,
      data: newBlog,
      message: "Blog created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST Blog");
  }
}

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
        status: 200,
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }

    const blog = await db.blog.findUnique({ where: { id } });

    if (!blog) {
      return createResponse({
        success: false,
        message: "Blog not found.",
        errors: ["No blog exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: blog,
      message: "Blog retrieved successfully.",
      status: 200,
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
        status: 400,
      });
    }
    if (!data || Object.keys(data).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",

        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }

    if (data.publicationDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.publicationDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for the publicationDate."],
        status: 400,
      });
    }

    if (data.topic) {
      if (!validTopics.includes(data.topic)) {
        return createResponse({
          success: false,
          message: "Invalid topic.",
          errors: [`Topic must be one of: ${validTopics.join(", ")}`],
          status: 400,
        });
      }
    }

    const blog = await db.blog.findUnique({ where: { id } });

    if (!blog) {
      return createResponse({
        success: false,
        message: "Blog not found.",
        errors: ["No blog exists with the given ID."],
        status: 404,
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
      status: 200,
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
        status: 400,
      });
    }

    await db.blog.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Blog deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Blog");
  }
}
