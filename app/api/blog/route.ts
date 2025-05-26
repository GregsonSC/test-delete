import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { createImage } from "../cloudinary/upload/route";
import { Topic } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const validTopics = ["WEBDESIGN", "DIGITALMARKETING"];

/**
 * @swagger
 * tags:
 *   - name: Blog
 *     description: Endpoint for managing blog posts, including creating new posts with various attributes.
 * /api/blog:
 *   post:
 *     tags:
 *       - Blog
 *     summary: Create a new blog post
 *     description: >
 *       Create a new blog post with required fields and valid topic.
 *       The `content` field must be a valid JSON object with the following structure:
 *       {
 *         "content1": "Contenido antes de la imagen",
 *         "content2": "Contenido después de la imagen",
 *         "quote": "Quote baje content1"
 *       }
 *       Images must be uploaded as multipart/form-data files.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - resume
 *               - topic
 *               - publicationDate
 *               - imageUrl
 *               - ContentImageUrl
 *               - content  # Campo JSON requerido
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Web Design Trends"
 *               resume:
 *                 type: string
 *                 example: "A brief overview of design patterns in 2025."
 *               topic:
 *                 type: string
 *                 enum: [WEBDESIGN, DIGITALMARKETING]  # Reemplaza con los temas válidos
 *                 example: WEBDESIGN
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *               ContentImageUrl:
 *                 type: string
 *                 format: binary
 *               SubTitle:
 *                 type: string
 *                 example: "Latest Trends"
 *               ImageSubTitle:
 *                 type: string
 *                 example: "Visual Representation"
 *               ImageReference:
 *                 type: string
 *                 example: "https://example.com/image-reference"
 *               userId:
 *                 type: integer
 *                 nullable: true
 *               content:
 *                 type: object
 *                 properties:
 *                   content1:
 *                     type: string
 *                     example: "Contenido antes de la imagen"
 *                   content2:
 *                     type: string
 *                     example: "Contenido después de la imagen"
 *                   quote:
 *                     type: string
 *                     example: "Quote baje content1"
 *     responses:
 *       201:
 *         description: Blog created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error while creating the blog.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const topic = formData.get("topic")?.toString();
    const publicationDate = formData.get("publicationDate")?.toString();
    const SubTitle = formData.get("SubTitle")?.toString();

    const ImageSubTitle = formData.get("ImageSubTitle")?.toString().trim() || "";
    const ImageReference = formData.get("ImageReference")?.toString().trim() || "";

    const ContentImageUrlForm = formData.get("ContentImageUrl");
    const imageUrlForm = formData.get("imageUrl");

    let ContentImageUrl: string | undefined = "";

    const userId = formData.get("userId")
      ? parseInt(formData.get("userId")!.toString(), 10)
      : undefined;

    if (userId) {
      // Validate that the User exists
      const user = await db.user.findUnique({ where: { id: userId } });
      if (!user) {
        return createResponse({ success: false, message: "User not found.", status: 400 });
      }
    }

    const rawContent = formData.get("content")?.toString();

    let content:
      | {
          content1: string;
          content2: string;
          quote: string;
        }
      | undefined;

    try {
      content = rawContent ? JSON.parse(rawContent) : undefined;

      if (
        !content ||
        typeof content.content1 !== "string" ||
        typeof content.content2 !== "string" ||
        typeof content.quote !== "string"
      ) {
        throw new Error("Invalid content structure");
      }
    } catch (error) {
      return createResponse({
        success: false,
        message: "Invalid content format.",
        errors: ["'content' must be a valid JSON with content1, content2, and quote."],
        status: 400,
      });
    }

    if (!(imageUrlForm instanceof File) || !(ContentImageUrlForm instanceof File)) {
      return createResponse({
        success: false,
        message: "The image must be valid file.",
        errors: ["Must be uploaded as file."],
        status: 400,
      });
    }

    const imageUrl = await createImage(imageUrlForm);
    if (ContentImageUrlForm) {
      ContentImageUrl = await createImage(ContentImageUrlForm);
    }

    if (
      !title ||
      !resume ||
      !content ||
      !topic ||
      !publicationDate ||
      !imageUrl ||
      !SubTitle ||
      !userId
    ) {
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
      data: {
        title,
        resume,
        content,
        topic: topic as Topic,
        publicationDate,
        imageUrl,
        SubTitle,
        ImageSubTitle,
        ContentImageUrl,
        ImageReference,
        userId,
      },
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
 * @swagger
 * /api/blog:
 *   get:
 *     tags:
 *       - Blog
 *     summary: Obtener uno o varios blogs, o una versión simplificada con paginación
 *     description: |
 *       Este endpoint permite:
 *       - Obtener un blog único si se proporciona el parámetro `id`.
 *       - Obtener una lista simplificada de blogs si `simpleBlog=true`, con soporte para paginación.
 *       - Obtener todos los blogs si no se proporcionan parámetros.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID del blog que se desea recuperar.
 *       - in: query
 *         name: simpleBlog
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         required: false
 *         description: Si es "true", devuelve una lista simplificada de blogs.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *         required: false
 *         description: Número de elementos a omitir en la paginación (solo con simpleBlog=true).
 *       - in: query
 *         name: simpleBlogsPerPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Número de blogs por página (solo con simpleBlog=true). Valor predeterminado 10.
 *     responses:
 *       200:
 *         description: Blog(s) recuperado(s) exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/Blog'
 *                     - type: array
 *                       items:
 *                         oneOf:
 *                           - $ref: '#/components/schemas/Blog'
 *                           - $ref: '#/components/schemas/SimpleBlog'
 *                 message:
 *                   type: string
 *                   example: Blog(s) retrieved successfully.
 *                 page:
 *                   type: object
 *                   nullable: true
 *                   description: Información de paginación (presente solo si simpleBlog=true o en la consulta general).
 *                   properties:
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     simpleBlogsPerPage:
 *                       type: integer
 *                       example: 10
 *                     totalBlogs:
 *                       type: integer
 *                       example: 100
 *       400:
 *         description: Parámetro `id` inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No se encontró el blog con el ID especificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    const simpleBlog = searchParams.get("simpleBlog");

    const offset = Number(searchParams.get("offset")) || 0;
    let simpleBlogsPerPage = Number(searchParams.get("simpleBlogsPerPage")) || 10;

    //simpleBlogs
    if (simpleBlog === "true") {
      const [simpleBlogs, totalBlogs] = await Promise.all([
        db.blog.findMany({
          skip: offset,
          take: simpleBlogsPerPage,
          select: {
            id: true,
            title: true,
            resume: true,
            topic: true,
            publicationDate: true,
            imageUrl: true,
          },
        }),
        db.blog.count(),
      ]);
      return NextResponse.json({
        success: true,
        data: simpleBlogs,
        message: "SimpleBlogs retrieved successfully.",
        status: 200,
        errors: [],
        page: {
          offset,
          simpleBlogsPerPage,
          totalBlogs,
        },
      });
    }
    // Get all Blog
    if (!requestId) {
      const [blogs, totalBlogs] = await Promise.all([
        db.blog.findMany({
          skip: offset,
          take: simpleBlogsPerPage,
        }),
        db.blog.count(),
      ]);
      return NextResponse.json({
        success: true,
        data: blogs,
        message: "Blogs retrieved successfully.",
        status: 200,
        page: { offset, simpleBlogsPerPage, totalBlogs },
      });
    }
    //validation
    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }
    //Get by id
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
 * @swagger
 * /api/blog:
 *   patch:
 *     tags:
 *       - Blog
 *     summary: Update an existing blog post
 *     description: >
 *       Updates an existing blog post by ID. Fields are optional but at least one must be provided.
 *
 *       The `topic` field must be one of the following values:
 *       - WEBDESIGN
 *       - DIGITALMARKETING
 *
 *       The `publicationDate` must be in `YYYY-MM-DD` format.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the blog post to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Web Design Trends"
 *               resume:
 *                 type: string
 *                 example: "A brief update on design patterns in 2025."
 *               content:
 *                 type: string
 *                 example: "In this update, we revise the 2024 design assumptions..."
 *               topic:
 *                 type: string
 *                 enum: [WEBDESIGN, DIGITALMARKETING]
 *                 example: DIGITALMARKETING
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-01"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *               ContentImageUrl:
 *                 type: string
 *                 format: binary
 *               SubTitle:
 *                 type: string
 *                 example: "Latest Trends"
 *               ImageSubTitle:
 *                 type: string
 *                 example: "Visual Representation"
 *               ImageReference:
 *                 type: string
 *                 example: "https://example.com/image-reference"
 *               userId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Blog updated successfully.
 *       400:
 *         description: Validation error or no data provided.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Server error while updating the blog.
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

    const SubTitle = formData.get("SubTitle")?.toString();
    const ImageSubTitle = formData.get("ImageSubTitle")?.toString();
    const ImageReference = formData.get("ImageReference")?.toString();

    const ContentImageUrlForm = formData.get("ContentImageUrl");
    const imageUrlForm = formData.get("imageUrl");

    const userId = formData.get("userId")
      ? parseInt(formData.get("userId")!.toString(), 10)
      : undefined;

    const ContentImageUrl =
      ContentImageUrlForm instanceof File ? await createImage(ContentImageUrlForm) : undefined;
    const imageUrl = imageUrlForm instanceof File ? await createImage(imageUrlForm) : undefined;

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

    if (SubTitle) updatedData.SubTitle = SubTitle;
    if (ImageSubTitle) updatedData.ImageSubTitle = ImageSubTitle;
    if (ContentImageUrl) updatedData.ContentImageUrl = ContentImageUrl;
    if (ImageReference) updatedData.ImageReference = ImageReference;
    if (userId) updatedData.userId = userId;

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
