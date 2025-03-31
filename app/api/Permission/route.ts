import { NextResponse } from "next/server";
import db from "@/lib/prisma";

// Function POST
export async function POST(request) {
  try {
    const data = await request.json();

    const newPermission = await db.permission.create({
      data,
    });

    return NextResponse.json(newPermission);
  } catch (error) {
    console.error("Error creating the permission.: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Function GET
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    //If no id is provided, we retrieve all permissions from the database.
    if (!requestId) {
      const permission = await db.permission.findMany();
      return NextResponse.json(permission);
    }
    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    //We search for the permission in the database by its id.
    const permission = await db.permission.findUnique({
      where: { id },
    });
    //If the permission does not exist, we return an error with status 404.
    if (!permission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }

    return NextResponse.json(permission);
  } catch (error) {
    console.error("Error obtaining permissions: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
//FUNCTION UPDATE
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    // We validate that the data is not empty.
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "The update data is required." }, { status: 400 });
    }

    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }
    //We search for the permission in the database by its id.
    const permission = await db.permission.findUnique({
      where: { id },
    });

    //If the permission does not exist, we return an error with status 404.
    if (!permission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }

    //We update the permission with the new data.
    const updatePermission = await db.permission.update({
      where: { id },
      data,
    });

    //We return the response with the updated permission.
    return NextResponse.json(updatePermission);
  } catch (error) {
    console.error("Error updating the permission.: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//Function DELETE
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    //check that id is valid.
    const id = Number(requestId);

    //If no id is provided.

    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    //We search for the permission in the database by its id.
    const permission = await db.permission.delete({
      where: { id },
    });
    //If the permission does not exist, we return an error with status 404.
    if (!permission) {
      return NextResponse.json({ error: "Permission not found" }, { status: 404 });
    }
    //We return a successful response.
    return NextResponse.json({ message: "Permission deleted successfully." });
  } catch (error) {
    console.error("Error deleting the permission.: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
