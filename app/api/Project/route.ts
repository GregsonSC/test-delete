import { NextResponse } from "next/server";
import db from "@/lib/prisma";

function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:` + error);
  return NextResponse.json(
    {
      error: `An error occurred in ${context}.`,
    },
    { status: 500 }
  );
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, expectedDuration, startDate, endDate, currentPhase } = data;
    
    if (!name || !description || !expectedDuration || !startDate || !endDate || !currentPhase) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    //Validate the date format.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || !/^\d{4}-\d{2}-\d{2}$/.test(endDate)) {
      return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
    }

    const newProject = await db.project.create({
      data,
    });
    return NextResponse.json(newProject);
  } catch (error) {
    return handleError(error, "POST Project");
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
    return handleError(error, "GET Project");
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    // Validate date format if provided.
    if (data.startDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.startDate)) {
      return NextResponse.json(
        { error: "Invalid startDate format. Use YYYY-MM-DD." },
        { status: 400 }
      );
    }
    if (data.endDate && !/^\d{4}-\d{2}-\d{2}$/.test(data.endDate)) {
      return NextResponse.json(
        { error: "Invalid endDate format. Use YYYY-MM-DD." },
        { status: 400 }
      );
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
    //We update the project with the new data.
    const updateProject = await db.project.update({
      where: { id },
      data: { ...data },
    });
    return NextResponse.json(updateProject);
  } catch (error) {
    return handleError(error, "PUT Project");
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

    //We return a successful response.
    return NextResponse.json({ message: "Project deleted successfully." });
  } catch (error) {
    return handleError(error, "DELETE Project");
  }
}
