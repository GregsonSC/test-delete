import { NextResponse,NextRequest } from "next/server";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {

  const data = await request.json();
  
  const userFound = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userFound) {
    return NextResponse.json(
      {
        message: "User with this email already exists",
      },
      {
        status: 400,
      }
    );
  }

  const newUser = await db.user.create({
    data,
  });

  return NextResponse.json(newUser);
}
export async function GET() {
  try {
    
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
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json();
    
    const userExists = await db.user.findUnique({ where: { id } });
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
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

export async function DELETE(request: NextRequest) {
  try {
    //Constante para buscar el id
    const { id } = await request.json();

    //Constante para ver si existe el valor en la base de datos
    const userExists = await db.user.findUnique({ where: { id } });
    //si el valor no existe que nos de un fallo que el usuario/id no existe
    if (!userExists) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.user.delete({ where: { id } });
    //En tal caso de que los usuarios si elimino nos lance un mensaje
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Error deleting user",error}, { status: 500 });
  }
}