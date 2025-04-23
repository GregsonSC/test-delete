import { NextResponse, NextRequest } from "next/server";
import db from "@/lib/prisma";
import { verifyToken, hashPassword } from "@/middleware/Secure-middleware";
// import {formatResponse,validateId } from "@/middleware/response-middleware"
/**
 * @route POST /api/users
 * @desc Crear un nuevo usuario
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const userFound = await db.user.findUnique({
      where: { email: data.email },
    });

    if (userFound) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User with this email already exists",
          errors: ["Email already registered"],
        },
        { status: 400 }
      );
    }

    data.password = await hashPassword(data.password);

    const newUser = await db.user.create({
      data,
      include: { role: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: [newUser],
        message: "User created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating user",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route GET /api/users
 * @desc Obtener usuarios o uno por id (query param ?id=)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const users = await db.user.findMany({
        select: {
          id: true,
          name: true,
          password: true, //Eliminar estos despues ya que no se tiene que devolver la contraseña
          email: true,
          phone: true,
          imageUrl: true,
          role: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: users,
        message: "Users fetched successfully",
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

    const user = await db.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User not found",
          errors: ["User does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: [user],
      message: "User fetched successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching users",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route PATCH /api/users?id={id}
 * @desc Actualizar un usuario por ID
 */
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "No data provided",
          errors: ["Missing request body"],
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
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User not found",
          errors: ["User does not exist"],
        },
        { status: 404 }
      );
    }
    if (data.email && data.email !== user.email) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Email cannot be modified",
          errors: ["Email change is not allowed"],
        },
        { status: 400 }
      );
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    // Eliminar el campo email antes de actualizar por seguridad extra
    delete data.email;

    const updatedUser = await db.user.update({
      where: { id },
      data,
      include: { role: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedUser],
      message: "User updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating user",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @route DELETE /api/users?id={id}
 * @desc Eliminar un usuario por ID
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    const userExists = await db.user.findUnique({ where: { id } });

    if (!userExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "User not found",
          errors: ["User does not exist"],
        },
        { status: 404 }
      );
    }

    const user = await db.user.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: [user],
      message: "User deleted successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting user",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
