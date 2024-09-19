import { connectDB } from '../lib/connectdb';
import Invoice from '../lib/InvoiceSchema';


export const GET = async (request: Request) => {
  try {
    // Connect to the database
    const db = await connectDB();
    console.log('Database connected successfully');

    // Fetch invoices from the database
    const invoices = await Invoice.find({});
    console.log('Fetched invoices:', invoices);

    if (invoices.length === 0) {
      console.log('No invoices found');
    }

    // Return the response with invoices
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