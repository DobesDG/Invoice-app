'use client'


import { useEffect, useState } from "react";


interface Invoice {
    _id: String,
    status: String ,
    pay_from:{
      streed_ad_from: String,
      city_from: String,
      pcode_city_from: String,
      country_from: String
    },
    pay_to: {
      client_name:String,
      client_email: String,
      street_ad_to: String,
      city_to:String,
      pcode_city_to: String,
      country_to: String,
      payment:String,
      description: String
    },
    date_added: { $date: Date },
    item_list: [
      {
          item_name: String,
          quant:  Number,
          price: Number
      }
    ]
}
  
export const Main: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../api/invoices');  // Your API route
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setInvoices(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Map through the invoices data and display it
  return (
    <div>
      <h1>Top Invoices</h1>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index}>
            <p>Metacritic Score: {invoice.status}</p>
            {/* Map other fields from the Invoice model here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
