import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

// export async function POST(request: NextRequest) {
//   const data = await request.json();
// }
// const roleExists = await db.role.findUnique({
//     where:{
//         name: data.name
//     }
// })

export async function GET() {
    try {
        const roles = await db.role.findMany({
            include: {
                users: true // Incluir usuarios relacionados si es necesario
            }
        });

        return NextResponse.json(roles);
    } catch (error) {
        return NextResponse.json({
            message: "Error fetching roles"
        }, { status: 500 });
    }
}