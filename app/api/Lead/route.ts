import { NextResponse } from "next/server";
import db from "@/lib/prisma";

// Function POST
export async function POST(request: Request) {
  const data = await request.json();

  //Create the Permission.
  const newLead = await db.lead.create({
    data,
  });
  return NextResponse.json(newLead);
}
