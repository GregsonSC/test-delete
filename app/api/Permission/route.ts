import {NextResponse} from "next/server"
import db from '@/lib/prisma'

export async function POST(request){
    const data = await request.json();
    console.dir(data, { depth: null });


    const newPermission = await db.permission.create({
        data
    });
    return NextResponse.json(newPermission);
}

