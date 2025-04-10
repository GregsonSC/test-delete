import { NextResponse ,NextRequest} from "next/server";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.content) {
      return NextResponse.json({ message: "Comment cotent is required" }, { status: 400 });
    }
    const newComment = await db.comment.create({
      data,
    });
    if (newComment) {
      return NextResponse.json(newComment, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating Comment:", error);
    return NextResponse.json({ message: "Error creating Comment", error }, { status: 500 });
  }
}

//Get/Get(id)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const comments = await db.comment.findMany({
        select: {
          id: true,
          content: true,
          sendData: true,
          sendTime: true,
        },
      });
      return NextResponse.json(comments);
    }
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ message: "The id must be a valid number" }, { status: 400 });
    }
    const comment = await db.comment.findUnique({
      where: { id },
    });
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching comment",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }

    const comment = await db.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Actualiza solo los campos proporcionados en `data`
    const updatedComment = await db.comment.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    return NextResponse.json({ message: "Error updating comment", error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);

    const commentExists = await db.comment.findUnique({ where: { id } });

    if (!commentExists) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    const comment = await db.comment.delete({ where: { id } });
    if (!comment) {
      return NextResponse.json({ message: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting Comment:", error);
    return NextResponse.json({ message: "Error deleting comment", error }, { status: 500 });
  }
}
