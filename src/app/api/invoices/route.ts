import { connectDB } from '../lib/connectdb';
import Invoice from '../lib/InvoiceSchema';

export const GET = async (request: Request) => {
  try {

    await connectDB(); 

    const url = new URL(request.url);
    const statusFilter = url.searchParams.getAll('status');
 
    const filter = statusFilter.length > 0 ? { status: { $in: statusFilter } } : {};
 
    const invoices = await Invoice.find((filter))

    if (invoices.length === 0) {
      console.log('No invoices found');
    }

    return new Response(JSON.stringify(invoices), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error('Error fetching invoices:', e);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};