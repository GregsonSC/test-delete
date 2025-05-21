import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   - name: Contract
 *     description: Contracts are legal agreements that establish rights and obligations between parties.
 *
 * /api/contract:
 *   post:
 *     tags:
 *       - Contract
 *     summary: Create a new contract
 *     description: Creates a contract with the data provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - signedDate
 *               - companyEmail
 *               - companyAdd
 *               - companyPhone
 *               - content
 *               - ownerName
 *               - ownerSignDate
 *               - recipientName
 *               - recipientSignDate
 *               - user_id
 *               - lead_id
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the contract.
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the contract was signed.
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 description: Email address of the company.
 *               companyAdd:
 *                 type: string
 *                 description: Address of the company.
 *               companyPhone:
 *                 type: string
 *                 description: Contact phone number of the company.
 *               content:
 *                 type: string
 *                 description: Content of the contract.
 *               ownerName:
 *                 type: string
 *                 description: Name of the owner signing the contract.
 *               ownerSignDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the owner signed the contract.
 *               recipientName:
 *                 type: string
 *                 description: Name of the recipient signing the contract.
 *               recipientSignDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the recipient signed the contract.
 *               user_id:
 *                 type: integer
 *                 description: ID of the user associated with the contract.
 *               lead_id:
 *                 type: integer
 *                 description: ID of the lead associated with the contract.
 *     responses:
 *       201:
 *         description: Contract created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contract created successfully
 *       400:
 *         description: Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Missing or invalid fields
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
 *                 message:
 *                   type: string
 *                   example: Error creating contract
 */

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const requiredFields = [
      "title",
      "signedDate",
      "companyEmail",
      "companyAdd",
      "companyPhone",
      "content",
      "ownerName",
      "recipientName",
      "user_id",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Campos faltantes en la solicitud",
          errors: missingFields.map((field) => `Falta el campo '${field}'`),
        },
        { status: 400 }
      );
    }

    const newContract = await db.contract.create({
      data: {
        title: data.title,
        signedDate: data.signedDate,
        companyEmail: data.companyEmail,
        companyAdd: data.companyAdd,
        companyPhone: data.companyPhone,
        content: data.content,
        ownerName: data.ownerName,
        ownerSignDate: data.ownerSignDate,
        recipientName: data.recipientName,
        recipientSignDate: data.recipientSignDate,
        userId: data.user_id,
        leadId: data.lead_id,
      },
      include: { user: true, lead: true },
    });

    return NextResponse.json(
      {
        success: true,
        data: [newContract],
        message: "Contrato creado exitosamente",
        errors: [],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando contrato:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error al crear el contrato",
        errors: [error instanceof Error ? error.message : "Error desconocido"],
      },
      { status: 500 }
    );
  }
}
/**
 * @swagger
 * tags:
 *   - name: Contract
 *     description: Operations related to contracts
 *
 * /api/contract:
 *   get:
 *     tags:
 *       - Contract
 *     summary: Retrieve contracts
 *     description: Fetch all contracts or a specific contract if the `id` parameter is provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID of the contract to retrieve (optional).
 *     responses:
 *       200:
 *         description: Contract(s) retrieved successfully.
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
 *                     $ref: '#/components/schemas/Contract'
 *                 message:
 *                   type: string
 *                   example: Contracts retrieved successfully
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: The provided ID is not valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID provided
 *       404:
 *         description: The contract was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Contract not found
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
 *                 message:
 *                   type: string
 *                   example: Error retrieving contracts
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const contract = await db.contract.findMany({
        select: {
          id: true,
          title: true,
          signedDate: true,
          companyEmail: true,
          companyAdd: true,
          companyPhone: true,
          content: true,
          ownerName: true,
          ownerSignDate: true,
          recipientName: true,
          recipientSignDate: true,
          user: true,
          lead: true,
        },
      });

      return NextResponse.json({
        success: true,
        data: contract,
        message: "Contract fetched successfully",
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

    const contract = await db.contract.findUnique({
      where: { id },
      include: { user: true, lead: true },
    });

    if (!contract) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Contract not found",
          errors: ["Contract does not exist"],
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: [contract],
        message: "Contract fetched successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error fetching contract",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * tags:
 *   - name: Contract
 *     description: Operations related to contracts
 *
 * /api/contract:
 *   patch:
 *     tags:
 *       - Contract
 *     summary: Update a contract
 *     description: Partially update an existing contract by providing its ID and the fields to be updated.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the contract to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the contract.
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the contract was signed.
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 description: Email address of the company.
 *               companyAdd:
 *                 type: string
 *                 description: Address of the company.
 *               companyPhone:
 *                 type: string
 *                 description: Phone number of the company.
 *               content:
 *                 type: string
 *                 description: Content of the contract.
 *               ownerName:
 *                 type: string
 *                 description: Name of the contract owner.
 *               ownerSignDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the owner signed the contract.
 *               recipientName:
 *                 type: string
 *                 description: Name of the recipient.
 *               recipientSignDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the recipient signed the contract.
 *     responses:
 *       200:
 *         description: Contract updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Contract updated successfully
 *       400:
 *         description: Invalid ID or missing data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid ID or missing required fields
 *       404:
 *         description: Contract not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Contract not found
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
 *                 message:
 *                   type: string
 *                   example: Error updating contract
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
          errors: ["Missing request body"],
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
          errors: ["Invalid ID"],
        },
        { status: 400 }
      );
    }

    const contract = await db.contract.findUnique({ where: { id } });

    if (!contract) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Contract not found",
          errors: ["Contract does not exist"],
        },
        { status: 404 }
      );
    }

    const updatedContract = await db.contract.update({
      where: { id },
      data,
      include: { user: true, lead: true },
    });

    return NextResponse.json({
      success: true,
      data: [updatedContract],
      message: "Contract updated successfully",
      errors: [],
    });
  } catch (error) {
    console.error("Error updating contract:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error updating ",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * tags:
 *   - name: Contract
 *     description: Operations related to contracts
 *
 * /api/contract:
 *   delete:
 *     tags:
 *       - Contract
 *     summary: Delete a contract
 *     description: Delete an existing contract by providing its ID as a query parameter.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the contract to delete.
 *     responses:
 *       200:
 *         description: Contract deleted successfully.
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
 *                   example: Contract deleted successfully
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Contract not found.
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
 *                   example: Contract not found
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
 *                   example: Error deleting contract
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
    const contractExists = await db.contract.findUnique({ where: { id } });

    if (!contractExists) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          message: "Contract not found",
          errors: ["Contract does not exist"],
        },
        { status: 404 }
      );
    }

    const contract = await db.contract.delete({ where: { id } });

    return NextResponse.json(
      {
        success: true,
        data: [contract],
        message: "Contract deleted successfully",
        errors: [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contract:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Error deleting contract",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 }
    );
  }
}
