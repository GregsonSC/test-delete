import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json({ message: "Comment name is required" }, { status: 400 });
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
