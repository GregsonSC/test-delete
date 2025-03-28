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
    return NextResponse.json({ message: "Error creating role",error }, { status: 500 });
  }
}
//Role all
export async function GET() {
  try {
    const role = await db.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!role || role.length === 0) {
      return NextResponse.json({ message: "No roles found" }, { status: 404 });
    }
    return NextResponse.json(role, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching role",
      },
      {
        status: 500,
      }
    );
  }
}
