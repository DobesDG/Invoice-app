'use client'


import { useEffect, useState } from "react";
import Image from "next/image";
import arrow_down from '../public/assets/icon-arrow-down.svg'
import plus from '../public/assets/icon-plus.svg'
import DateComponent from "./Date";
import arrow_right from '../public/assets/icon-arrow-right.svg'
import {Filter}from '../components/Filter'

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
  const [filterOn,setFilterOn] = useState(false)
  const [status,setStatus] = useState<string[]>([])

  const handleFilter = () => {
    setFilterOn(!filterOn)
  }

  const colorStatus = (typeStatus: string) => {
    switch (typeStatus) {
      case 'Paid':
        return ['bg-light-green','text-light-green','bg-transp-green'];
      case 'Pending':
        return ['bg-orange','text-orange','bg-transp-orange'];
      case 'Draft':
        return ['bg-white','text-white','bg-transp-white'];
      default:
        return '';
    }
  }

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const query = status.map(s => `status=${s}`).join('&');
        const response = await fetch(`../api/invoices?${query}`);
        
        if (!response.ok) throw new Error('Error fetching data');
        const data = await response.json();
        setInvoices(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [status]);

  if (loading) return <p className="flex flex-row w-full h-[100vh] justify-center items-center text-white text-xl">Loading...</p>;
  if (error) return <p className="flex flex-row w-full h-[100vh] justify-center items-center text-white text-xl">Error: {error}</p>;

  return (
    <section className="flex flex-col justify-start pt-16 items-center w-full min-h-[100vh] tracking-[-0.25px] pl-[103px] hover:cursor-pointer">
      <section className="flex flex-row text-white justify-between w-[730px] mb-14">
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-bold tracking-[-1px]">Invoices</p>
          <p className="text-[12px]">There are {invoices.length} total invoices</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <button className="flex flex-row items-baseline gap-3 relative" onClick={handleFilter}>
            <p className="text-[12px] font-bold tracking-normal">Filter by status</p>
            <Image className={`h-[7px] transform transition-transform duration-300 ${filterOn ? 'scale-y-[-1]' : ''}`} src={arrow_down} width={11} alt=""/>
            {filterOn && (
              <div className="absolute flex flex-col justify-between items-start p-6 bg-light-purple mt-6 w-48 h-32 top-[100%] left-[-50%] shadow-filterShadow rounded-lg">
                <Filter label="Draft" value={status} setValue={setStatus} />
                <Filter label="Pending" value={status} setValue={setStatus} />
                <Filter label="Paid" value={status} setValue={setStatus} />
              </div>
              )}
          </button>  
          <button className="flex flex-row gap-4 justify-start items-center bg-violet pl-2 pr-[15px] py-2 rounded-3xl text-[12px] font-bold hover:bg-light-violet">
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
            <div className="flex flex-row bg-dark-blue border-dark-blue border-[1px] p-6 rounded-lg mb-4 w-[730px] justify-between transition-all duration-300 ease-out shadow-none hover:border-violet">
              <div className="flex flex-row justify-center items-center">
                <span className="text-blue-steel text-xs font-bold">#</span>
                <p className="text-white text-xs font-bold mr-7">{invoice._id}</p>
                <p className="text-white text-[0.6875rem]">Due <DateComponent dateString={invoice.date_added}/></p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-between items-center w-[249px]">
                  <p className="text-white text-[0.75rem]">{invoice.pay_to.client_name}</p>
                  <p className="text-white text-base font-bold tracking-[-0.8px]">
                    ${invoice.item_list.reduce((acc, cur) => acc + cur.quant * cur.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`flex flex-row justify-center items-center h-10 w-[6.5rem] rounded-md ml-8 ${colorStatus(invoice.status)[2]}`}>
                  <div className="flex flex-row items-baseline">
                    <span className={`w-[8px] h-[8px] mr-[8px] ${colorStatus(invoice.status)[0]} rounded-full`}></span>
                    <p className={`text-xs font-bold text-center ${colorStatus(invoice.status)[1]}`}>{invoice.status}</p>
                  </div>
                </div>
                  <Image className="ml-4" src={arrow_right} alt="" width={7} height={11} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
