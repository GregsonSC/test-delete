import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import argon2 from "argon2";
import { signToken } from "@/lib/jwt";


export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const user = await db.user.findUnique({ where: { email } });

  if (!user || !(await argon2.verify(user.password, password))) {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email or password",
        errors: ["Credentials mismatch"],
        data: [],
      },
      { status: 401 }
    );
  }

  const token = signToken({ id: user.id, email: user.email });

  return NextResponse.json({
    success: true,
    message: "Login successful",
    data: [{ token }],
    errors: [],
  });
}
