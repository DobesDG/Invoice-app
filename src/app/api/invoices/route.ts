import { connectDB } from '../lib/connectdb';
import Invoice from '../lib/InvoiceSchema';

export const GET = async (request: Request) => {
  try {

    const db = await connectDB(); 

    const invoices = await Invoice.find({})

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