import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "API is working correctly",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    status: "success",
    message: "Data received successfully",
    data: body,
    timestamp: new Date().toISOString(),
  });
}
