import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { createImage } from "../cloudinary/upload/route";
import { Topic } from "@prisma/client";

const validTopics = ["WEBDESIGN", "DIGITALMARKETING", "GRAPHICDESIGN"];
/**
 * @route POST /api/blog
 * @desc Crear un nuevo Blog
 * @swagger
 * /api/blog:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new Blog
 *     description: Create a new Blog with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - resume
 *               - content
 *               - topic
 *               - publicationDate
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Title of the blog."
 *               resume:
 *                 type: string
 *                 description: "Short summary of the blog."
 *               content:
 *                 type: string
 *                 description: "Full content of the blog."
 *               topic:
 *                 type: string
 *                 description: "Topic of the blog. Must be one of: WEBDESIGN, DIGITALMARKETING, GRAPHICDESIGN."
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 description: "Publication date of the blog in YYYY-MM-DD format."
 *               imageUrl:
 *                 type: string
 *                 description: "URL of the blog's image."
 *     responses:
 *       201:
 *         description: Blog created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: "The created blog object."
 *                 message:
 *                   type: string
 *                   example: Blog created successfully.
 *       400:
 *         description: Bad request, missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: All fields are required.
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error creating blog
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
export async function POST(request: Request) {
  try {    
    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const content = formData.get("content")?.toString();
    const topic = formData.get("topic")?.toString();
    const publicationDate = formData.get("publicationDate")?.toString();
    
    const imageUrl = await createImage(formData);

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

    const newBlog = await db.blog.create({
      data: { title, resume, content, topic: topic as Topic, publicationDate, imageUrl },
    });

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
/**
 * @route GET /api/blog
 * @desc Obtener todos los blogs o uno por ID
 * @swagger
 * /api/blog:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Get one or all blogs
 *     description: Returns a single blog by ID if query param `id` is provided. Otherwise, returns all blogs.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: "ID of the blog to retrieve."
 *     responses:
 *       200:
 *         description: Blog(s) retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: "Blog object or list of blogs."
 *                 message:
 *                   type: string
 *                   example: Blog(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @route PATCH /api/blog
 * @desc Actualizar un blog existente
 * @swagger
 * /api/blog:
 *   patch:
 *     tags:
 *       - Blog
 *     summary: Update a blog
 *     description: Updates a blog using the provided fields. Only sends updated fields.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "ID of the blog to update."
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               resume:
 *                 type: string
 *               content:
 *                 type: string
 *               topic:
 *                 type: string
 *                 description: "Must be one of: WEBDESIGN, DIGITALMARKETING, GRAPHICDESIGN."
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Blog updated successfully.
 *       400:
 *         description: Invalid input or no data to update.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Server error.
 */

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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

    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const content = formData.get("content")?.toString();
    const topic = formData.get("topic")?.toString();
    const publicationDate = formData.get("publicationDate")?.toString();

    let imageUrl;
    const hasImage = formData.get("imageUrl");
    if (hasImage && typeof hasImage === "object") {
      imageUrl = await createImage(formData);
    }

    // Validaciones
    if (publicationDate && !/^\d{4}-\d{2}-\d{2}$/.test(publicationDate)) {
      return createResponse({
        success: false,
        message: "Invalid date format.",
        errors: ["Use YYYY-MM-DD format for the publicationDate."],
        status: 400,
      });
    }

    if (topic && !validTopics.includes(topic)) {
      return createResponse({
        success: false,
        message: "Invalid topic.",
        errors: [`Topic must be one of: ${validTopics.join(", ")}`],
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

    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (resume) updatedData.resume = resume;
    if (content) updatedData.content = content;
    if (topic) updatedData.topic = topic as Topic;
    if (publicationDate) updatedData.publicationDate = publicationDate;
    if (imageUrl) updatedData.imageUrl = imageUrl;

    if (Object.keys(updatedData).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }

    const updatedBlog = await db.blog.update({
      where: { id },
      data: updatedData,
    });

    return createResponse({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH Blog");
  }
}

/**
 * @route DELETE /api/blog
 * @desc Eliminar un blog por ID
 * @swagger
 * /api/blog:
 *   delete:
 *     tags:
 *       - Blog
 *     summary: Delete a blog
 *     description: Deletes a blog based on the given ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: "ID of the blog to delete."
 *     responses:
 *       200:
 *         description: Blog deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       500:
 *         description: Server error.
 */

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
