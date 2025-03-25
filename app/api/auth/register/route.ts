import { NextResponse } from "next/server";
import db from '@/lib/prisma';

export async function POST(request) {
    const data = await request.json();

    const userFound = await db.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (userFound) {
        return NextResponse.json({
            message: "User with this email already exists"
        }, {
            status: 400
        })
    }

    const newUser = await db.user.create({
        data
    });

    return NextResponse.json(newUser);
}