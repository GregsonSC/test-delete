import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";
import { createImage } from "../cloudinary/upload/route";
import { Topic } from "@prisma/client";

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
    const ImageSubTitle = formData.get("ImageSubTitle")?.toString();
    const ImageReference = formData.get("ImageReference")?.toString();

    const ContentImageUrlForm = formData.get("ContentImageUrl")?.toString();
    const imageUrlForm = formData.get("imageUrl");

    const userId = formData.get("userId")
      ? parseInt(formData.get("userId")!.toString(), 10)
      : undefined;

    const rawContent = formData.get("content")?.toString();

    // ✅ Validar y parsear el JSON content
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
    const ContentImageUrl = await createImage(ContentImageUrlForm);

    
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
