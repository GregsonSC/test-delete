import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function POST(request) {
  const data = await request.json();

  const newPermission = await db.permission.create({
    data,
  });
  return NextResponse.json(newPermission);
}

export async function GET() {
  try {
    const permissions = await db.permission.findMany(); // Get all permissions
    console.dir(permissions, { depth: null });
    return NextResponse.json(permissions);
  } catch (error) {
    console.error("Error to get permissions: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
