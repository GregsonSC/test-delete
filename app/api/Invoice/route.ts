import { NextResponse } from "next/server";
import db from "@/lib/prisma";

//FUNCTION POST
export async function POST(request) {
  try {
    const data = await request.json();

    const newInvoice = await db.invoice.create({
      data,
    });
    return NextResponse.json(newInvoice);
  } catch (error) {
    console.error("Error creating the Invoice: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");

    //If no id is provided, we retrieve all invoices from the database.
    if (!requestId) {
      const invoices = await db.invoice.findMany();
      return NextResponse.json(invoices);
    }
    //check that id is valid.
    const id = Number(requestId);
    if (isNaN(id) || !id) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }
    //We search for the invoice in the database by its id.
    const invoice = await db.invoice.findUnique({
      where: { id },
    });
    //If the invoice does not exist, we return an error with status 404.
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    return NextResponse.json(invoice);
  } catch (error) {
    console.error("Error obtaining invoices: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//FUNCTION UPDATE
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get("id");
    const data = await request.json();

    // We validate that the data is not empty.
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: "The update data is required." }, { status: 400 });
    }

    //check that idd is valid
    const id = Number(requestId);
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The ID must be a valid number" }, { status: 400 });
    }

    //We search for the invoice in the database by its id.
    const invoice = await db.invoice.findUnique({
      where: { id },
    });

    //If the invoice does not exist, we return an error with status 404.
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    //We update the invoice with the new data.
    const updateInvoice = await db.invoice.update({
      where: { id },
      data,
    });

    //We return the response with the updated permission.
    return NextResponse.json(updateInvoice);
  } catch (error) {
    console.error("Error updating the invoice: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//FUNCTION DELETE
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get("id");
    //check that id is valid.
    const id = Number(requestId);

    //If no id is provided.
    if (isNaN(id) || !requestId) {
      return NextResponse.json({ error: "The id must be a valid number" }, { status: 400 });
    }

    //We search for the invoice in the database by its id.
    const invoice = await db.invoice.delete({
      where: { id },
    });

    //If the invoice does not exist, we return an error with status 404.
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    //We return a successful response.
    return NextResponse.json({ message: "Invoice deleted successfully." });
  } catch (error) {
    console.error("Error updating the invoice: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
