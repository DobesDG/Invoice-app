import { connectDB } from '@/app/lib/connectdb';
import Invoice from '@/app/lib/InvoiceSchema';

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
