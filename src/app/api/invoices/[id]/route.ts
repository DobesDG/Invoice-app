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
