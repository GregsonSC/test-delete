import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newProject = await db.project.create({
      data,
    });
    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating the Project: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    //If no id is provided, we retrieve all projects from the database.
    if (!requestId) {
      const projects = await db.project.findMany();
      return NextResponse.json(projects);
    }
    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    //We search for the project in the database by its id.
    const project = await db.project.findUnique({
      where: { id },
    });
    //If the project does not exist, we return an error with status 404.
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error obtaining project: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function PUT(request: Request) {
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
    //We search for the project in the database by its id.
    const project = await db.project.findUnique({
      where: { id },
    });
    //If the project does not exist, we return an error with status 404.
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    //We update the permission with the new data.
    const updateProject = await db.project.update({
      where: { id },
      data,
    });
    return NextResponse.json(updateProject);
  } catch (error) {
    console.error("Error updating the project: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
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
    //We search for the project in the database by its id.
    const project = await db.project.delete({
      where: { id },
    });
    //If the project does not exist, we return an error with status 404.
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    //We return a successful response.
    return NextResponse.json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting the project: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
