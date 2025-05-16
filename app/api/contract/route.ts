import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

/**
 * @swagger
 * tags:
 *   - name: Contract
 *     description: Los contratos son acuerdos legales que establecen derechos y obligaciones entre las partes.
 * /api/contract:
 *   post:
 *     tags:
 *       - Contract
 *     summary: Crear un nuevo contrato
 *     description: Crea un contrato con los datos enviados en el body.
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
 *                 description: Título del contrato.
 *               signedDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de firma del contrato.
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico de la compañía.
 *               companyAdd:
 *                 type: string
 *                 description: Dirección de la compañía.
 *               companyPhone:
 *                 type: string
 *                 description: Teléfono de contacto de la compañía.
 *               content:
 *                 type: string
 *                 description: Contenido del contrato.
 *               ownerName:
 *                 type: string
 *                 description: Nombre del propietario que firma el contrato.
 *               ownerSignDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de firma del propietario.
 *               recipientName:
 *                 type: string
 *                 description: Nombre del destinatario que firma el contrato.
 *               recipientSignDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de firma del destinatario.
 *               user_id:
 *                 type: integer
 *                 description: ID del usuario asociado al contrato.
 *               lead_id:
 *                 type: integer
 *                 description: ID del lead asociado al contrato.
 *     responses:
 *       201:
 *         description: Contrato creado exitosamente
 *       400:
 *         description: Campos faltantes o inválidos
 *       500:
 *         description: Error del servidor
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
      "ownerSignDate",
      "recipientName",
      "recipientSignDate",
      "user_id",
      "lead_id",
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
 * /api/contract:
 *   get:
 *     tags:
 *       - Contract
 *     summary: Obtener contratos
 *     description: Obtiene todos los contratos o uno específico si se proporciona el parámetro `id`.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: false
 *         schema:
 *           type: integer
 *         description: ID del contrato a obtener (opcional)
 *     responses:
 *       200:
 *         description: Contrato(s) obtenido(s) exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Contract'
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: El ID proporcionado no es válido
 *       404:
 *         description: El contrato no fue encontrado
 *       500:
 *         description: Error interno del servidor
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
 * /api/contract:
 *   patch:
 *     tags:
 *       - Contract
 *     summary: Actualizar un contrato
 *     description: Actualiza parcialmente un contrato por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título del contrato
 *               signedDate:
 *                 type: string
 *                 description: Fecha de firma
 *               companyEmail:
 *                 type: string
 *                 format: email
 *                 description: Correo de la empresa
 *               companyAdd:
 *                 type: string
 *                 description: Dirección de la empresa
 *               companyPhone:
 *                 type: string
 *                 description: Teléfono de la empresa
 *               content:
 *                 type: string
 *                 description: Contenido del contrato
 *               ownerName:
 *                 type: string
 *                 description: Nombre del propietario
 *               ownerSignDate:
 *                 type: string
 *                 description: Fecha de firma del propietario
 *               recipientName:
 *                 type: string
 *                 description: Nombre del destinatario
 *               recipientSignDate:
 *                 type: string
 *                 description: Fecha de firma del destinatario
 *     responses:
 *       200:
 *         description: Contrato actualizado exitosamente
 *       400:
 *         description: ID inválido o datos faltantes
 *       404:
 *         description: Contrato no encontrado
 *       500:
 *         description: Error del servidor
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
 * /api/contract:
 *   delete:
 *     tags:
 *       - Contract
 *     summary: Eliminar un contrato
 *     description: Elimina un contrato existente por su ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del contrato a eliminar
 *     responses:
 *       200:
 *         description: Contrato eliminado exitosamente
 *       404:
 *         description: Contrato no encontrado
 *       500:
 *         description: Error del servidor
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
