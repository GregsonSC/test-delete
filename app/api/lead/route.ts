
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import { error } from "console";

//Insert New Lead
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.state) {
      return NextResponse.json({ message: "Lead state is required in capital " }, { status: 400 });
    }
    const newLead = await db.lead.create({
      data,
    });
    if (newLead) {
      return NextResponse.json(newLead, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating Lead:", error);
    return NextResponse.json({ message: "Error creating Lead", error }, { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const leads = await db.lead.findMany({
        select: {
          id: true,
          clientName: true,
          clientEmail: true,
          clientPhone: true,
          name: true,
          state: true,
          starDate: true,
          endDate: true,
          userId: true,
        },
      });
      return NextResponse.json(leads);
    }
    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json({ message: "The id must be a valid number" }, { status: 400 });
    }
    const lead = await db.lead.findUnique({
      where: { id },
    });
    if (!lead) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(lead, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching lead",
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

    const lead = await db.lead.findUnique({
      where: { id },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const updatedLead = await db.lead.update({
      where: { id },
      data, // PATCH permite actualizar solo los campos proporcionados
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ message: "Error updating lead", error }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);

    const leadExist = await db.lead.findUnique({
      where: {
        id,
      },
    });
    if (!leadExist) {
      return NextResponse.json({ message: "lead not found " }, { status: 400 });
    }
    const lead = await db.lead.delete({ where: { id } });
    if (!lead) {
      return NextResponse.json({ message: "lead not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Lead delete Succefull" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json({ message: "Error deleting lead", error }, { status: 500 });
  }
}
