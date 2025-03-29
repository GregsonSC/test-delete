import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 });
    }

    const newUser = await db.user.create({ data });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Error creating role", error }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const users = await db.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          imageUrl: true,
        },
      });
      return NextResponse.json(users);
    }
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    const user = await db.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users", error }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ message: "No data provided" }, { status: 400 });
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verifica si el nuevo email ya está en uso por otro usuario
    if (data.email) {
      const existingUser = await db.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser && existingUser.id !== id) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 });
      }
    }

    const updatedUser = await db.user.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);

    const userExists = await db.user.findUnique({ where: { id } });

    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = await db.user.delete({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
  }
}
