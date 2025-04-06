import { NextResponse } from "next/server";
import db from "@/lib/prisma";

function handleError(error: unknown, context: string) {
  console.error(`Error in ${context}:` + error);
  return NextResponse.json(
    {
      error: `An error occurred in ${context}`,
    },
    { status: 500 }
  );
}
export async function POST(request: Request) {
  try {
    const data = await request.json();

    //Data validation.
    const { estimatedTime, description, state, lead_id, totalValue } = data;
    if (!estimatedTime || !description || !state || !lead_id || !totalValue) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    // Validate that lead_id is an integer.
    if (!Number.isInteger(lead_id)) {
      return NextResponse.json({ error: "lead_id must be an integer." }, { status: 400 });
    }
    //"Validate that `totalValue` is a decimal number."
    if (isNaN(totalValue) || typeof totalValue !== "number") {
      return NextResponse.json({ error: "totalValue must be a decimal number." }, { status: 400 });
    }

    const newEstimate = await db.estimate.create({ data });
    return NextResponse.json(newEstimate);
  } catch (error) {
    return handleError(error, "POST estimate.");
  }
}

// function GET
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    //If no id is provided, we retrieve all estimates from the database.
    if (!requestId) {
      const estimates = await db.estimate.findMany();
      return NextResponse.json(estimates);
    }
    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "The id must be a valid number." }, { status: 400 });
    }
    //We search for the estimate in the database by its id.
    const estimate = await db.estimate.findUnique({
      where: { id },
    });
    //If the estimate does not exist, we return an error with status 404.
    if (!estimate) {
      return NextResponse.json({ error: "Estimate not found." }, { status: 404 });
    }

    return NextResponse.json(estimate);
  } catch (error) {
    return handleError(error, "GET estimate.");
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
      return NextResponse.json({ error: "The ID must be a valid number." }, { status: 400 });
    }
    //"Check if there is data to update."
    if(!data || Object.keys(data).length===0){
      return NextResponse.json({ error: "At least one field must be provided for update." }, { status: 400 });
    }
    //Search for the estimate in the database by its id.
    const estimate = await db.estimate.findUnique({
      where: { id },
    });
    //If the estimate does not exist, we return an error with status 404.
    if (!estimate) {
      return NextResponse.json({ error: "Estimate not found." }, { status: 404 });
    }
    //We update the estimate with the new data.
    const updateEstimate = await db.estimate.update({
      where: { id },
      data:{...data},
    });
    return NextResponse.json(updateEstimate);
  } catch (error) {
    return handleError(error, "PATCH estimate.");
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    //check that id is valid.
    const id = Number(requestId);

    //check that related is valid.
    const relatedProjects = await db.project.findMany({
      where: { estimate_id: id },
    });
    if (relatedProjects.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete estimate because it is associated with projects." },
        { status: 400 }
      );
    }

    //If no id is provided or it is not a number.
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The id must be a valid number." }, { status: 400 });
    }

    //We search for the estimate in the database by its id.
    const estimate = await db.estimate.delete({
      where: { id },
    });

    //We return a successful response.
    return NextResponse.json({ message: "Estimate deleted successfully." });
  } catch (error) {
    console.error("Error deleting the estimate: ", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the estimate." },
      { status: 500 }
    );
  }
}
