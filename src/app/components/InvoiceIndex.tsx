'use client'


import { useEffect, useState } from "react";
import Image from "next/image";
import arrow_down from '../public/assets/icon-arrow-down.svg'
import plus from '../public/assets/icon-plus.svg'
import DateComponent from "./Date";

interface Invoice {
    _id: String,
    status: string ,
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
    date_added: string,
    item_list: [
      {
          item_name: String,
          quant:  number,
          price: number
      }
    ]
}
  
export const InvoiceIndex: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorStatus = (typeStatus: string) => {
    switch (typeStatus) {
      case 'Paid':
        return ['bg-[#33d69f]','text-[#33d69f]'];
      case 'Pending':
        return ['bg-[#ff8f00]','text-[#ff8f00]'];
      case 'Draft':
        return ['bg-white','text-white'];
      default:
        return '';
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('../api/invoices');
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

  if (loading) return <p className="flex flex-row w-full justify-center items-center text-white text-xl">Loading...</p>;
  if (error) return <p className="flex flex-row w-full justify-center items-center text-white text-xl">Error: {error}</p>;

  return (
    <section className="flex flex-col justify-start pt-16 items-center w-full">
      <section className="flex flex-row text-white gap-72">
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-bold">Invoices</p>
          <p className="text-[12px]">There are {invoices.length} total invoices</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button className="flex flex-row items-center gap-4">
            <p className="text-[12px] font-bold">Filter by status</p>
            <Image className="h-[7px] focus:transform:translate-y-1" src={arrow_down} width={11} alt=""/>
          </button>  
          <button className="flex flex-row gap-2 justify-start items-center bg-violet pl-2 pr-[15px] py-2 rounded-3xl text-[12px] font-bold hover:bg-light-violet">
            <span className="bg-white flex justify-center items-center rounded-3xl w-8 h-8">
              <Image src={plus} alt=""/>
            </span>
            New Invoice
            </button>
        </div>
      </section>
      <ul className="flex flex-col w-full justify-center items-center">  
        {invoices.map((invoice, index) => (
          <li key={index}>
            <div className="flex flex-row bg-dark-blue p-6 rounded-lg mb-4">
              <div className="flex flex-row justify-center items-center">
                <span className="text-[#7e88c3] text-xs font-bold">#</span>
                <p className="text-white text-xs font-bold">{invoice._id}</p>
                <p className="text-white text-[0.6875rem]">Due <DateComponent dateString={invoice.date_added}/></p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                  <p className="text-white text-[0.6875rem]">{invoice.pay_to.client_name}</p>
                  <p className="text-white text-base font-bold">${invoice.item_list.reduce((acc, cur) => acc + cur.quant * cur.price, 0).toFixed(2)}</p>
                </div>
                <div className="flex flex-row justify-center items-center">
                  <span className={`w-[8px] h-[8px] ${colorStatus(invoice.status)[0]} rounded-full`}></span>
                  <p className={`text-xs font-bold ${colorStatus(invoice.status)[1]}`}>{invoice.status}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
