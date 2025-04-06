import { NextResponse } from "next/server";
import db from "@/lib/prisma";

function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:` + error);
  return NextResponse.json(
    {
      error: `An error occurred in ${context}.`,
    },
    { status: 500 }
  );
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, resume, content, topic, publicationDate, imageUrl } = data;

    if (!title || !resume || !content || !topic || !publicationDate || !imageUrl) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const newBlog = await db.blog.create({
      data,
    });
    return NextResponse.json(newBlog);
  } catch (error) {
    return handleError(error, "POST Blog");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    //If no id is provided, we retrieve all blogs from the database.
    if (!requestId) {
      const blogs = await db.blog.findMany();
      return NextResponse.json(blogs);
    }
    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    //We search for the blog in the database by its id.
    const blog = await db.blog.findUnique({
      where: { id },
    });
    //If the blog does not exist, we return an error with status 404.
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(blog);
  } catch (error) {
    return handleError(error, "GET Blog");
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }
    //We search for the blog in the database by its id.
    const blog = await db.blog.findUnique({
      where: { id },
    });
    //If the blog does not exist, we return an error with status 404.
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    //We update the blog with the new data.
    const updateBlog = await db.blog.update({
      where: { id },
      data: { ...data },
    });
    return NextResponse.json(updateBlog);
  } catch (error) {
    return handleError(error, "PUT Blog");
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    //check that id is valid.
    const id = Number(requestId);

    //If no id is provided.
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    //We search for the blog in the database by its id.
    const blog = await db.blog.delete({
      where: { id },
    });
  } catch (error) {
    return handleError(error, "DELETE Blog");
  }
}
