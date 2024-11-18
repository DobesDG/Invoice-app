'use client'

import { useEffect, useState } from 'react';
import { Header } from '@/app/components/Header';
import arrow_left from '@/app/public/assets/icon-arrow-left.svg'
import Image from 'next/image';
import Link from 'next/link';
import DateComponent from '@/app/components/Date' 
import { Mutate }from '@/app/components/Mutate'
import { useLocalStorage } from '@/app/lib/useLocalStorage';
import { ThemeContext } from "@/app/components/ThemeContext";

interface Invoice {
    _id: string;
    status: string;
    pay_from: {
      street_ad_from: string;
      city_from: string;
      pcode_city_from: string;
      country_from: string;
    };
    pay_to: {
      client_name: string;
      client_email: string;
      street_ad_to: string;
      city_to: string;
      pcode_city_to: string;
      country_to: string;
      payment: number;
      description: string;
    };
    date_added: string;
    item_list: [
      {
          item_name: string;
          quant: number;
          price: number;
      }
    ];
}

export default function InvoiceDetailsPage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = params;
    const [dark , setDark] = useLocalStorage('dark', true)


    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await fetch(`/api/invoices/${id}`);
                if (!response.ok) throw new Error('Error fetching data');
                const data = await response.json();
                setInvoice(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

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
    };

    if (loading) return <p className="flex flex-row w-full h-[100vh] justify-center items-center text-white text-xl">Loading...</p>;
    if (error) return <p className="flex flex-row w-full h-[100vh] justify-center items-center text-white text-xl">Error: {error}</p>;
    if (!invoice) return <p className="flex flex-row w-full h-[100vh] justify-center items-center text-white text-xl">Invoice not found.</p>;

    return (
        <ThemeContext.Provider value={dark}>
            <div className={`flex flex-row ${dark ? "bg-dark-purple" : "bg-gray-50"}`}>
            <Header dark={dark} setDark={setDark}/>
            <section className={`flex flex-col justify-start pt-16 items-center w-full min-h-[100vh] tracking-[-0.25px] pl-[103px] max-xl:pt-[103px] max-xl:pl-0 ${dark ? "text-white" : 'text-steel-blue'}`}>
                <section className="flex flex-row justify-between w-[730px] max-xl:w-[672px]">
                    <div className='hover:cursor-pointer pt-3 pb-8'>
                        <Link href={'/'} className='flex flex-row items-baseline gap-4'>
                            <Image className='w-[7px] h-[10px]' src={arrow_left} alt="" width={7} height={10} />
                            <p className={`text-[12px] font-bold ${dark ? "text-white" : 'text-black'}`}>Go back</p>
                        </Link>
                    </div>
                </section>
                <section className={`flex flex-row border-[1px] p-8 rounded-lg mb-4 w-[730px] justify-between max-xl:w-[672px] ${dark ? "bg-dark-blue border-dark-blue" : "bg-white border-white shadow-filterShadow"}`}>
                    <div className='flex flex-row items-baseline'>
                        <p className='text-[12px]'>Status</p>
                        <div className={`flex flex-row justify-center items-center h-10 w-[6.5rem] rounded-md ml-8 ${colorStatus(invoice.status)[2]}`}>
                            <div className="flex flex-row items-baseline">
                                <span className={`w-[8px] h-[8px] mr-[8px] ${colorStatus(invoice.status)[0]} rounded-full`}></span>
                                <p className={`text-xs font-bold text-center ${colorStatus(invoice.status)[1]}`}>{invoice.status}</p>
                            </div>
                        </div>
                    </div >
                    <Mutate data={invoice} invoiceId={invoice._id} invoiceStatus={invoice.status}/>
                </section>
                <section className={`flex flex-col border-[1px] p-6 rounded-lg w-[730px] max-xl:w-[672px] ${dark ? "bg-dark-blue border-dark-blue" : "bg-white border-white shadow-filterShadow"}`}>
                    <section className='flex flex-row justify-between mb-8'>
                        <div className='flex flex-col justify-start items-start'>
                            <div className="flex flex-row justify-center items-center mb-2">
                                <span className="text-blue-steel text-xs font-bold">#</span>
                                <p className={`text-xs font-bold ${dark ? 'text-white' : 'text-black'}`}>{invoice._id}</p>
                            </div>
                            <p className="text-[12px]">{invoice.pay_to.description}</p>
                        </div>
                        <div className='flex flex-col items-start text-[0.6875rem]'>
                            <p className='mb-1'>{invoice.pay_from.street_ad_from}</p>
                            <p className='mb-1'>{invoice.pay_from.city_from}</p>
                            <p className='mb-1'>{invoice.pay_from.pcode_city_from}</p>
                            <p className='mb-1'>{invoice.pay_from.country_from}</p>
                        </div>
                    </section>
                    <section className='flex flex-row'>
                        <div className='mr-20'>
                            <div>
                                <p className='text-[12px] mb-4'>Invoice Date</p>
                                <h3 className={`font-bold mb-8 ${dark ? 'text-white' : 'text-black'}`}><DateComponent dateString={invoice.date_added} days={0}/></h3>
                            </div>
                            <div>
                                <p className='text-[12px] mb-4'>Payment Due</p>
                                <h3 className={`font-bold mb-8 ${dark ? 'text-white' : 'text-black'}`}><DateComponent dateString={invoice.date_added} days={invoice.pay_to.payment}/></h3>
                            </div>
                        </div>
                        <div className='mr-40'>
                            <p className='text-[12px] mb-4'>Bill to</p>
                            <h3 className={`font-bold mb-3 ${dark ? 'text-white' : 'text-black'}`}>{invoice.pay_to.client_name}</h3>
                            <div className='flex flex-col items-start text-[0.6875rem]'>
                                <p className='mb-1'>{invoice.pay_to.street_ad_to}</p>
                                <p className='mb-1'>{invoice.pay_to.city_to}</p>
                                <p className='mb-1'>{invoice.pay_to.pcode_city_to}</p>
                                <p className='mb-1'>{invoice.pay_to.country_to}</p>
                            </div>
                        </div>
                        <div>
                            <p className='text-[12px] mb-4'>Sent To</p>
                            <h3 className={`font-bold mb-3 ${dark ? 'text-white' : 'text-black'}`}>{invoice.pay_to.client_email}</h3>
                        </div>
                    </section>
                    <section className='flex flex-col justify-center align-baseline w-full'>
                        <div className={`rounded-t-lg p-8 ${dark ? "bg-light-purple border-dark-blue" : "bg-transp-white border-white text-black"}`}>
                            <table className="w-full table-fixed">
                                <thead>
                                    <tr className="text-[0.6875rem]">
                                        <td className="w-[45%] pb-4 text-left">Item Name</td>
                                        <td className="w-[15%] pb-4 text-right">QTY.</td>
                                        <td className="w-[20%] pb-4 text-right">Price</td>
                                        <td className="w-[20%] pb-4 text-right">Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoice.item_list.map((inv, index) => (
                                        <tr key={index} className="text-[12px] font-bold">
                                            <td className="py-4">{inv.item_name}</td>
                                            <td className="py-4 text-right">{inv.quant}</td>
                                            <td className="py-4 text-right">${inv.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                            <td className="py-4 text-right">${(inv.quant * inv.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={`bg-dark-gray rounded-b-lg py-8 px-6 flex flex-row justify-between items-baseline text-white ${dark ? 'bg-dark-gray' : 'bg-light-purple'}`}>
                            <p className='text-[0.6875rem]'>Amount Due</p>
                            <p className='text-[20px] font-bold'>${invoice.item_list.reduce((acc, cur) => acc + cur.quant * cur.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    </section>
                </section>
            </section>
            </div>
        </ThemeContext.Provider>
    );
}
