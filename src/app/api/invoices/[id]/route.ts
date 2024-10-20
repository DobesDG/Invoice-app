import { connectDB } from '../../../lib/connectdb';
import Invoice from '../../../lib/InvoiceSchema';

export const GET = async (request: Request, { params }: { params: { id: string } }) => {

  await connectDB();

  const invoice = await Invoice.findById(params.id);

  if (!invoice) {
    return new Response("Invoice not found", { status: 404 });
  }

  return new Response(JSON.stringify(invoice), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const toDelete = await Invoice.deleteOne({ _id: params.id });


    if (toDelete.deletedCount === 0) {
      return new Response("Invoice not found", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Invoice deleted successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response("Failed to delete invoice", { status: 500 });
  }
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  try {
    await connectDB();

    const update = await Invoice.updateOne({ _id: params.id }, { $set: { status: 'Paid' } });


    if (update.modifiedCount === 0) {
      return new Response("Invoice not found", { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Invoice status updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response("Failed to update invoice status", { status: 500 });
  }
};
