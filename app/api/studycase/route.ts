import db from "@/lib/prisma";
import { createResponse, handleError } from "@/app/api/utils/handlers";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const videoUrl = formData.get("resume")?.toString();

    if (!title || !resume || !videoUrl) {
      return createResponse({
        success: false,
        message: "All fields are required.",
        errors: ["Missing one or more required fields."],
        status: 400,
      });
    }

    const newStudyCase = await db.studyCase.create({
      data: { title, resume, videoUrl },
    });

    return createResponse({
      success: true,
      data: newStudyCase,
      message: "StudyCase created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST StudyCase");
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const studyCases = await db.studyCase.findMany();
      return createResponse({
        success: true,
        data: studyCases,
        message: "StudyCases retrieved successfully.",
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

    const studyCase = await db.studyCase.findUnique({ where: { id } });

    if (!studyCase) {
      return createResponse({
        success: false,
        message: "StudyCase not found.",
        errors: ["No StudyCase exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: studyCase,
      message: "StudyCase retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET StudyCase");
  }
}
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
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

    const formData = await request.formData();

    const title = formData.get("title")?.toString();
    const resume = formData.get("resume")?.toString();
    const videoUrl = formData.get("videoUrl")?.toString();

    const updatedData: any = {};
    if (title) updatedData.title = title;
    if (resume) updatedData.resume = resume;
    if (videoUrl) updatedData.videoUrl = videoUrl;

    if (Object.keys(updatedData).length === 0) {
      return createResponse({
        success: false,
        message: "No update data provided.",
        errors: ["At least one field must be provided for update."],
        status: 400,
      });
    }
    
    const updatedStudyCase = await db.studyCase.update({
      where: { id },
      data: updatedData,
    });
    
    return createResponse({
      success: true,
      data: updatedStudyCase,
      message: "Studycase updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH StudyCase");
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

    await db.studyCase.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "StudyCase deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE StudyCase");
  }
}

