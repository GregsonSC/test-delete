import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

const validState = ["datos"];
const validArea = ["datos"];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, state, area } = data;

    if (!name || !description) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    if (!validState.includes(state)) {
      return createResponse({
        success: false,
        message: "Invalid state.",
        errors: [`State must be one of: ${validState.join(", ")}`],
        status: 400,
      });
    }
    if (!validArea.includes(area)) {
      return createResponse({
        success: false,
        message: "Invalid area.",
        errors: [`Area must be one of: ${validArea.join(", ")}`],
        status: 400,
      });
    }

    const newWorkTeam = await db.workTeam.create({ data });

    return createResponse({
      success: true,
      data: newWorkTeam,
      message: "WorkTeam created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST WorkTeam");
  }
}
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const blogs = await db.blog.findMany();
      return createResponse({
        success: true,
        data: blogs,
        message: "Blogs retrieved successfully.",
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
    const workteam = await db.workTeam.findUnique({ where: { id } });

    if (!workteam) {
      return createResponse({
        success: false,
        message: "WorkTeam not found.",
        errors: ["No WorkTeam exists with the given ID."],
        status: 404,
      });
    }
    return createResponse({
      success: true,
      data: workteam,
      message: "Workteam retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET WorkTeam");
  }
}
export async function PATCH(request: Request) {
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
    if (data.state) {
      if (!validState.includes(data.state)) {
        return createResponse({
          success: false,
          message: "Invalid state.",
          errors: [`State must be one of: ${validState.join(", ")}`],
          status: 400,
        });
      }
    }
    if (data.area) {
      if (!validArea.includes(data.area)) {
        return createResponse({
          success: false,
          message: "Invalid area.",
          errors: [`Area must be one of: ${validArea.join(", ")}`],
          status: 400,
        });
      }
    }

    const workteam = await db.workTeam.findUnique({ where: { id } });
    if (!workteam) {
      return createResponse({
        success: false,
        message: "WorkTeam not found.",
        errors: ["No workTeam exists with the given ID."],
        status: 404,
      });
    }

    const updateWorkTeam = await db.workTeam.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updateWorkTeam,
      message: "WorkTeam updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH WorkTeam");
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The ID must be a valid number."],
        status: 400,
      });
    }
    await db.workTeam.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Blog deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE Blog");
  }
}
