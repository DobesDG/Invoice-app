import { connectDB } from '../../lib/connectdb';
import Invoice from '../../lib/InvoiceSchema';

export const GET = async (request: Request) => {
  try {
    await connectDB();

    const url = new URL(request.url);
    const statusFilter = url.searchParams.getAll('status');
    const filter = statusFilter.length > 0 ? { status: { $in: statusFilter } } : {};

    const invoices = await Invoice.aggregate([
      { $match: filter },
      {
        $addFields: {
          due_date: {
            $add: [
              { $toDate: "$date_added" },
              { $multiply: ["$pay_to.payment", 24 * 60 * 60 * 1000] }
            ]
          }
        }
      },
      { $sort: { due_date: 1 } }
    ]);

    if (invoices.length === 0) {
      console.log('No invoices found');
    }

    return new Response(JSON.stringify(invoices), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('Error fetching invoices:', e);
    return new Response(
      JSON.stringify({ message: 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const POST = async ( request: Request ) => {
  try {
    await connectDB();

    const makeLetterID = (length: number) => {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    };

    const makeNumberID = (length: number) => {
      let result = '';
      const characters = '0123456789';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    const makeID = () => makeLetterID(2) + makeNumberID(4);
    
    const body = await request.json()

    const doc = {...body, _id: makeID(), date_added: new Date()}

    console.log(doc)

    await Invoice.insertMany(doc)

    return new Response(
      JSON.stringify({
        message: `Invoice ${makeID()} created successfully`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response("Failed to create invoice", { status: 500 });
  }
};