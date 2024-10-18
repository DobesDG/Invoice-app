import { connectDB } from '@/app/lib/connectdb';
import Invoice from '@/app/lib/InvoiceSchema';

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
