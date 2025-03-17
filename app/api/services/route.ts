import { NextResponse } from "next/server";
import { getServices } from "@/data/repositories/service-repository";

export async function GET() {
  const services = await getServices();

  return NextResponse.json({
    status: "success",
    data: services,
  });
}
