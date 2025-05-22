import { createResponse, handleError } from "@/app/api/utils/handlers";
import db from "@/lib/prisma";
const validServiceAssociated = [
  "NORMALUSERS",
  "ADMINUSERS",
  "LEADS",
  "ESTIMATES",
  "PROJECTS",
  "BLOGS",
  "PRODUCTS",
  "SERVICEAREAS",
];
const validAction = ["GET", "CREATE", "UPDATE", "DELETE"];
/** 
 * @swagger
 * tags:
 *   - name: Permission
 *     description: Action that a user can perform on a service of the web application, for example, creating, editing, or deleting users.
 * /api/permission:
 *   post:
 *     tags:
 *       - Permission
 *     summary: Create a new permission
 *     description: Create a new permission with the required fields.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - action
 *               - active
 *               - serviceAssociated
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [GET, CREATE, UPDATE, DELETE]
 *               active:
 *                 type: boolean
 *               serviceAssociated:
 *                 type: string
 *                 enum: [NORMALUSERS, ADMINUSERS, LEADS, ESTIMATES, PROJECTS, BLOGS, PRODUCTS, SERVICEAREAS]
 *     responses:
 *       201:
 *         description: Permission created successfully.
 *       400:
 *         description: Missing or invalid fields.
 *       500:
 *         description: Server error.
 */

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, description, action, active, serviceAssociated } = data;

    if (!name  || !action || active === undefined || !serviceAssociated) {
      return createResponse({
        success: false,
        message: "All required fields must be provided.",
        errors: ["The fields 'name', 'action', 'active', and 'serviceAssociated' are required and cannot be empty."],
        status: 400,
      });
    }

    if (typeof active !== "boolean") {
      return createResponse({
        success: false,
        message: "Invalid field type.",
        errors: ["'active' must be a boolean."],
        status: 400,
      });
    }
    if (!validServiceAssociated.includes(serviceAssociated)) {
      return createResponse({
        success: false,
        message: "Invalid service associated.",
        errors: [`Service Associated must be one of: ${validServiceAssociated.join(", ")}`],
        status: 400,
      });
    }
    if (!validAction.includes(action)) {
      return createResponse({
        success: false,
        message: "Invalid action.",
        errors: [`Action must be one of: ${validAction.join(", ")}`],
        status: 400,
      });
    }

    const newPermission = await db.permission.create({ data });

    return createResponse({
      success: true,
      data: newPermission,
      message: "Permission created successfully.",
      status: 201,
    });
  } catch (error) {
    return handleError(error, "POST permission");
  }
}

/**
 * @route GET /api/permission
 * @desc Obtener todos los permisos o uno por ID
 * @swagger
 * /api/permission:
 *   get:
 *     tags:
 *       - Permission
 *     summary: Get one or all permissions
 *     description: Returns all permissions or a specific one if ID is provided.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID of the permission to retrieve.
 *     responses:
 *       200:
 *         description: Permission(s) retrieved successfully.
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: Permission not found.
 *       500:
 *         description: Server error.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    if (!requestId) {
      const permissions = await db.permission.findMany();
      return createResponse({
        success: true,
        data: permissions,
        message: "Permissions retrieved successfully.",
        status: 200,
      });
    }

    const id = Number(requestId);
    if (isNaN(id)) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The id must be a valid number."],
        status: 400,
      });
    }

    const permission = await db.permission.findUnique({ where: { id } });

    if (!permission) {
      return createResponse({
        success: false,
        message: "Permission not found.",
        errors: ["No permission exists with the given ID."],
        status: 404,
      });
    }

    return createResponse({
      success: true,
      data: permission,
      message: "Permission retrieved successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "GET permission");
  }
}

/**
 * @route PATCH /api/permission
 * @desc Actualizar un permiso
 * @swagger
 * /api/permission:
 *   patch:
 *     tags:
 *       - Permission
 *     summary: Update a permission
 *     description: Update fields of a permission. Only send fields to update.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the permission to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [GET, CREATE, UPDATE, DELETE]
 *               active:
 *                 type: boolean
 *               serviceAssociated:
 *                 type: string
 *                 enum: [NORMALUSERS, ADMINUSERS, LEADS, ESTIMATES, PROJECTS, BLOGS, PRODUCTS, SERVICEAREAS]
 *     responses:
 *       200:
 *         description: Permission updated successfully.
 *       400:
 *         description: Invalid input or no data provided.
 *       404:
 *         description: Permission not found.
 *       500:
 *         description: Server error.
 */

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
    if (data.active) {
      if (typeof data.active !== "boolean") {
        return createResponse({
          success: false,
          message: "Invalid field type.",
          errors: ["'active' must be a boolean."],
          status: 400,
        });
      }
    }
    if (data.validServiceAssociated) {
      if (!data.validServiceAssociated.includes(data.serviceAssociated)) {
        return createResponse({
          success: false,
          message: "Invalid service associated.",
          errors: [`Service Associated must be one of: ${validServiceAssociated.join(", ")}`],
          status: 400,
        });
      }
    }

    if (data.action) {
      if (!validAction.includes(data.action)) {
        return createResponse({
          success: false,
          message: "Invalid action.",
          errors: [`Action must be one of: ${validAction.join(", ")}`],
          status: 400,
        });
      }
    }
    const permission = await db.permission.findUnique({ where: { id } });

    if (!permission) {
      return createResponse({
        success: false,
        message: "Permission not found.",
        errors: ["No permission exists with the given ID."],
        status: 404,
      });
    }

    const updatePermission = await db.permission.update({
      where: { id },
      data: { ...data },
    });

    return createResponse({
      success: true,
      data: updatePermission,
      message: "Permission updated successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "PATCH permission");
  }
}

/**
 * @route DELETE /api/permission
 * @desc Eliminar un permiso por ID
 * @swagger
 * /api/permission:
 *   delete:
 *     tags:
 *       - Permission
 *     summary: Delete a permission
 *     description: Delete a permission using its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the permission to delete.
 *     responses:
 *       200:
 *         description: Permission deleted successfully.
 *       400:
 *         description: Invalid ID.
 *       500:
 *         description: Server error.
 */

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    const id = Number(requestId);

    if (isNaN(id) || !requestId) {
      return createResponse({
        success: false,
        message: "Invalid ID.",
        errors: ["The id must be a valid number."],
        status: 400,
      });
    }

    await db.permission.delete({ where: { id } });

    return createResponse({
      success: true,
      message: "Permission deleted successfully.",
      status: 200,
    });
  } catch (error) {
    return handleError(error, "DELETE permission");
  }
}
