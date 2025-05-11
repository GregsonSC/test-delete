import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";
import { authMiddleware } from "@/middleware/SecureJWT-middleware";

/**
 * @swagger
 * tags:
 *   - name: Lead
 *     description: Operations related to leads
 *
 * /api/lead:
 *   post:
 *     tags:
 *       - Lead
 *     summary: Create a new lead
 *     description: Create a new lead with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 description: Name of the client.
 *                 example: John Doe
 *               clientEmail:
 *                 type: string
 *                 description: Email of the client.
 *                 example: johndoe@example.com
 *               clientPhone:
 *                 type: string
 *                 description: Phone number of the client.
 *                 example: "+123456789"
 *               name:
 *                 type: string
 *                 description: Name of the lead.
 *                 example: Lead Name
 *               description:
 *                 type: string
 *                 description: Detailed description of the lead.
 *                 example: This lead is interested in our premium services.
 *               state:
 *                 type: string
 *                 description: State of the lead (required), SEND, PROCESSING, ESTIMATING OR FINISHED.
 *                 example: SEND
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the lead.
 *                 example: "2023-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the lead.
 *                 example: "2023-12-31"
 *               userId:
 *                 type: integer
 *                 description: ID of the associated user.
 *                 example: 1
 *               serviceId:
 *                 type: integer
 *                 description: ID of the associated service.
 *                 example: 2
 *     responses:
 *       201:
 *         description: Lead created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: The created lead object.
 *                 message:
 *                   type: string
 *                   example: Lead created successfully
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad request, missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Lead state is required in capital
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: Unauthorized. Missing or invalid JWT token.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Error creating lead
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.state) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead state is required in capital",
          errors: ["Missing 'state' field"],
        },
        { status: 400 }
      );
    }

    const newLead = await db.lead.create({ data, include: { user: true, service: true } });

    return NextResponse.json(
      {
        success: true,
        data: [newLead],
        message: "Lead created successfully",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error creating lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * tags:
 *   - name: Lead
 *     description: Operations related to leads
 *
 * /api/lead:
 *   get:
 *     tags:
 *       - Lead
 *     summary: Get all leads or a specific lead by ID
 *     description: Retrieve all leads or a specific lead by providing its ID as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the lead to retrieve.
 *     responses:
 *       200:
 *         description: Leads fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: The lead object(s).
 *                 message:
 *                   type: string
 *                   example: Leads fetched successfully
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: The id must be a valid number
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Lead not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Lead not found
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Error fetching lead
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */
export async function GET(request: NextRequest) {
  // Validar el token antes de continuar
  const auth = authMiddleware(request);
  if (auth) return auth;

  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const leads = await db.lead.findMany({
        select: {
          id: true,
          clientName: true,
          clientEmail: true,
          clientPhone: true,
          name: true,
          state: true,
          startDate: true,
          endDate: true,
          user: true,
          service: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: leads,
        message: "Leads fetched successfully",
        errors: [],
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The id must be a valid number",
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const lead = await db.lead.findUnique({
      where: { id },
      include: { user: true, service: true },
    });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead not found",
          errors: ["Lead does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [lead],
        message: "Lead fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * tags:
 *   - name: Lead
 *     description: Operations related to leads
 *
 * /api/lead:
 *   patch:
 *     tags:
 *       - Lead
 *     summary: Update a lead partially
 *     description: Update the fields of a lead by providing its ID as a query parameter and the updated data in the body.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lead to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientName:
 *                 type: string
 *                 description: Updated name of the client.
 *                 example: Jane Doe
 *               clientEmail:
 *                 type: string
 *                 description: Updated email of the client.
 *                 example: janedoe@example.com
 *               clientPhone:
 *                 type: string
 *                 description: Updated phone number of the client.
 *                 example: "+987654321"
 *               name:
 *                 type: string
 *                 description: Updated name of the lead.
 *                 example: Updated Lead Name
 *               state:
 *                 type: string
 *                 description: Updated state of the lead.
 *                 example: PROCESSING
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Updated start date.
 *                 example: "2024-05-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Updated end date.
 *                 example: "2024-12-31"
 *               userId:
 *                 type: integer
 *                 description: Updated user ID.
 *                 example: 2
 *               serviceId:
 *                 type: integer
 *                 description: Updated service ID.
 *                 example: 3
 *     responses:
 *       200:
 *         description: Lead updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Lead updated successfully
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid ID or bad request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: The id must be a valid number
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Lead not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Lead not found
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Error updating lead
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "No data provided",
          errors: ["Empty body"],
        },
        { status: 400 }
      );
    }

    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "The ID must be a valid number",
          errors: ["Invalid or missing ID"],
        },
        { status: 400 }
      );
    }

    const lead = await db.lead.findUnique({ where: { id } });

    if (!lead) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead not found",
          errors: ["Lead does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedLead = await db.lead.update({
      where: { id },
      data,
      include: { user: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedLead],
      message: "Lead updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * tags:
 *   - name: Lead
 *     description: Operations related to leads
 *
 * /api/lead:
 *   delete:
 *     tags:
 *       - Lead
 *     summary: Delete a lead
 *     description: Delete a specific lead by providing its ID as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the lead to delete.
 *     responses:
 *       200:
 *         description: Lead deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Lead deleted successfully
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Invalid ID provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: The id must be a valid number
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Lead not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Lead not found
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: Error deleting lead
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 */

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    const id = Number(requestId);
    const leadExist = await db.lead.findUnique({ where: { id } });

    if (!leadExist) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Lead not found",
          errors: ["Lead with that ID does not exist"],
        },
        { status: 404 }
      );
    }

    const deletedLead = await db.lead.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [deletedLead],
        message: "Lead deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting lead",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
