'use client'


import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import plus from '../public/assets/icon-plus.svg'
import { useRouter } from 'next/navigation';
import { FilterGroup } from "./FilterGroup";
import { InvoiceInfo } from "./InvoiceInfo";
import { CreateEdit } from "./CreateEdit";

interface Invoice {
    _id: string,
    status: string ,
    pay_from:{
      street_ad_from: string,
      city_from: string,
      pcode_city_from: string,
      country_from: string
    },
    pay_to: {
      client_name:string,
      client_email: string,
      street_ad_to: string,
      city_to:string,
      pcode_city_to: string,
      country_to: string,
      payment:number,
      description: string
    },
    date_added: string,
    item_list: [
      {
          item_name: string,
          quant:  number,
          price: number
      }
    ]
}

export const InvoiceIndex: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [newInvoiceOn, setNewInvoiceOn] = useState(false)
  const [error, setError] = useState(null);
  const [status,setStatus] = useState<string[]>([])
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

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
    <section className="flex flex-col justify-start pt-16 items-center w-full min-h-[100vh] tracking-[-0.25px] pl-[103px] max-xl:pl-0 max-xl:pt-32">
      <section className="flex flex-row text-white justify-between w-[730px] mb-14 max-xl:w-[672px]">
        <div className="flex flex-col gap-2">
          <p className="text-[32px] font-bold tracking-[-1px]">Invoices</p>
          <p className="text-[12px]">There are {invoices.length} total invoices</p>
        </div>
        <div className="flex flex-row items-center gap-4">
         <FilterGroup statusValue={status} setStatusValue={setStatus} modalRef={modalRef} />
          <button onClick={() => setNewInvoiceOn(!newInvoiceOn)} className="flex flex-row gap-4 justify-start items-center bg-violet pl-2 pr-[15px] py-2 rounded-3xl text-[12px] font-bold hover:bg-light-violet">
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
            <InvoiceInfo  
            router={router} 
            Id={invoice._id} 
            Status={invoice.status} 
            DateString={invoice.date_added} 
            ClientName={invoice.pay_to.client_name} 
            ItemList={invoice.item_list}
            Payment={invoice.pay_to.payment}/>
          </li>
        ))}
      </ul>
      {newInvoiceOn && (
        <section className="fixed flex flex-row justify-start items-start z-10 w-full h-full top-0 left-[6.4375rem] right-0 bg-45%-transp">
          <CreateEdit modalRef={modalRef} onClose={() => setNewInvoiceOn(!newInvoiceOn)}/>
      </section>)}
    </section>
  );
}
