// lib/middleware/checkBlocked.ts
import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import { isValidIP, isPrivateIP } from "./validationIP";

const THRESHOLD = 5;
const WINDOW_MINUTES = 15;

export async function checkBlocked(request: NextRequest, email?: string) {
  let ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";

  if (!isValidIP(ip) || isPrivateIP(ip)) {
    ip = request.headers.get("x-real-ip") || "unknown";
  }

  if (!isValidIP(ip)) {
    ip = "unknown";
  }

  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);

  const failedAttempts = await db.loginAttempt.count({
    where: {
      attemptedAt: { gte: since },
      success: false,
      OR: [{ ip }, ...(email ? [{ email }] : [])],
    },
  });

  const blocked = failedAttempts >= THRESHOLD;

  return { blocked, ip };
}
