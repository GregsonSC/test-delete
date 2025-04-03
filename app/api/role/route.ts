import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

//Insert New Role
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.name) {
      return NextResponse.json({ message: "Role name is required" }, { status: 400 });
    }
    const newRole = await db.role.create({
      data,
    });
    if (newRole) {
      return NextResponse.json(newRole, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating role:", error);
    return NextResponse.json({ message: "Error creating role", error }, { status: 500 });
  }
}
//Role all
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const roles = await db.role.findMany({
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
      return NextResponse.json(roles);
    }
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ message: "The id must be a valid number" }, { status: 400 });
    }
    const role = await db.role.findUnique({
      where: { id },
    });
    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }
    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching role",
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

    const role = await db.role.findUnique({
      where: { id },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Actualizar solo los campos proporcionados en `data`
    const updatedRole = await db.role.update({
      where: { id },
      data, // PATCH permite modificaciones parciales
    });

    return NextResponse.json(updatedRole);
  } catch (error) {
    console.error("Error updating role:", error);
    return NextResponse.json({ message: "Error updating role", error }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);

    const roleExists = await db.role.findUnique({ where: { id } });

    if (!roleExists) {
      return NextResponse.json({ message: "role not found" }, { status: 404 });
    }

    const role = await db.role.delete({ where: { id } });
    if (!role) {
      return NextResponse.json({ message: "role not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Role deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting role:", error);
    return NextResponse.json({ message: "Error deleting role", error }, { status: 500 });
  }
}
