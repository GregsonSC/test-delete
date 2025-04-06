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
  const data = await request.json();
  const {
    name,
    description,
    active,
    county,
    heroImageUrl,
    benefitsImageUrl,
    testimonialEmbed,
    service_id,
  } = data;
  if (
    !name ||
    !description ||
    !active ||
    !county ||
    !heroImageUrl ||
    !benefitsImageUrl ||
    !testimonialEmbed ||
    !service_id
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const newServiceArea = await db.serviceArea.create({
    data,
  });
  return NextResponse.json(newServiceArea);
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
    //We search for the serviceArea in the database by its id.
    const serviceArea = await db.serviceArea.findUnique({
      where: { id },
    });
    //If the project does not exist, we return an error with status 404.
    if (!serviceArea) {
      return NextResponse.json({ error: "ServiceArea not found" }, { status: 404 });
    }
    return NextResponse.json(serviceArea);
  } catch (error) {
    return handleError(error, "GET ServiceArea");
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }
    //We search for the serviceArea in the database by its id.
    const serviceArea = await db.serviceArea.findUnique({
      where: { id },
    });
    //If the serviceArea does not exist, we return an error with status 404.
    if (!serviceArea) {
      return NextResponse.json({ error: "serviceArea not found" }, { status: 404 });
    }
    //We update the serviceArea with the new data.
    const UpdateserviceArea = await db.serviceArea.update({
      where: { id },
      data: { ...data },
    });
    return NextResponse.json(UpdateserviceArea);
  } catch (error) {
    return handleError(error, "PUT ServiceArea");
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
    const ServiceArea = await db.ServiceArea.delete({
      where: { id },
    });

    //We return a successful response.
    return NextResponse.json({ message: "ServiceArea deleted successfully." });
  } catch (error) {
    return handleError(error, "DELETE ServiceArea");
  }
}
