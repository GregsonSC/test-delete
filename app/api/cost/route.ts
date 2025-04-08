import { NextResponse,NextRequest } from "next/server";
import db from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
      const data = await request.json();
  
      if (!data.name) {
        return NextResponse.json({ message: "cost name is required" }, { status: 400 });
      }
      const newCost = await db.cost.create({
        data,
      });
      if (newCost) {
        return NextResponse.json(newCost, { status: 201 });
      }
    } catch (error) {
      console.error("Error creating Cost:", error);
      return NextResponse.json({ message: "Error creating Cost", error }, { status: 500 });
    }
  }
  export async function GET(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const requestId = searchParams.get("id");
  
      if (!requestId) {
        const costs = await db.cost.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            type: true,
            value:true,
            estimateId:true
          },
        });
        return NextResponse.json(costs);
      }
      const id = Number(requestId);
      if (isNaN(id)) {
        return NextResponse.json({ message: "The id must be a valid number" }, { status: 400 });
      }
      const cost = await db.cost.findUnique({
        where: { id },
      });
      if (!cost) {
        return NextResponse.json({ error: "Cost not found" }, { status: 404 });
      }
      return NextResponse.json(cost, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        {
          message: "Error fetching cost",
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
  
      const cost = await db.cost.findUnique({
        where: { id },
      });
  
      if (!cost) {
        return NextResponse.json({ error: "Cost not found" }, { status: 404 });
      }
  
      // Actualiza solo los campos proporcionados en `data`
      const updatedCost = await db.cost.update({
        where: { id },
        data,
      });
  
      return NextResponse.json(updatedCost);
    } catch (error) {
      console.error("Error updating cost:", error);
      return NextResponse.json({ message: "Error updating cost", error }, { status: 500 });
    }
  }
  export async function DELETE(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const requestId = searchParams.get("id");
  
      const id = Number(requestId);
  
      const costExists = await db.cost.findUnique({ where: { id } });
  
      if (!costExists) {
        return NextResponse.json({ message: "cost not found" }, { status: 404 });
      }
  
      const cost = await db.cost.delete({ where: { id } });
      if (!cost) {
        return NextResponse.json({ message: "Cost not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Cost deleted successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting Cost:", error);
      return NextResponse.json({ message: "Error deleting Cost", error }, { status: 500 });
    }
  }  