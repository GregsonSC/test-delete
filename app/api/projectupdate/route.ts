import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const { title, content, date, project_id, phase_id } = data;

        if (!title || !content || !date || !project_id || !phase_id) {
            return createResponse({
                success: false,
                message: "All fields are required.",
                errors: ["Missing one or more required fields."],
                status: 400,
            });

        }
        const newProjectUpdate = await db.projectUpdate.create({ data });
        return createResponse({
            success: true,
            data: newProjectUpdate,
            message: "ProjectUpdate created successfully.",
            status: 201,
        });

    } catch (error) {

        return handleError(error, "POST ProjectUpdate");
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const requestId = searchParams.get("id");

        if (!requestId) {
            const projectsUpdate = await db.projectUpdate.findMany();
            return createResponse({
                success: true,
                data: projectsUpdate,
                message: "ProjectsUpdate retrieved successfully.",
                status: 200,
            });
        }
        const id = Number(requestId);
        if (isNaN(id)) {
            return createResponse({
                success: false,
                message: "Invalid ID.",
                errors: ["The ID must be a valid number."],
                status: 400,
            });
        }
        const projectUpdate = await db.projectUpdate.findUnique({ where: { id } });
        if (!projectUpdate) {
            return createResponse({
                success: false,
                message: "ProjectUpdate not found.",
                errors: ["No ProjectUpdate exists with the given ID."],
                status: 404,
            });
        }
        return createResponse({
            success: true,
            data: projectUpdate,
            message: "ProjectUpdate retrieved successfully.",
            status: 200,
        });
    } catch (error) {
        return handleError(error, "GET ProjectUpdate");
    }
}

export async function PATH(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const requestId = searchParams.get("id");
        const id = Number(requestId);
        const data = await request.json();

        if (isNaN(id) || !requestId) {
            return createResponse({
                success: false,
                message: "Invalid ID.",
                errors: ["The ID must be a valid number."],
                status: 400,
            });
        }
        if (!data || Object.keys(data).length === 0) {
            return createResponse({
                success: false,
                message: "No update data provided.",

                errors: ["At least one field must be provided for update."],
                status: 400,
            });
        }
        const projectUpdate = await db.projectUpdate.findUnique({ where: { id } });
        if (!projectUpdate) {
            return createResponse({
                success: false,
                message: "ProjectUpdate not found.",
                errors: ["No projectUpdate exists with the given ID."],
                status: 404,
            });
        }
        const updateProjectUpdate = await db.projectUpdate.update({
            where: { id },
            data: { ...data },
        });
        return createResponse({
            success: true,
            data: updateProjectUpdate,
            message: "ProjectUpdate updated successfully.",
            status: 200,
        });

    } catch (error) {
        return handleError(error, "PATCH projectUpdate");
    }
}