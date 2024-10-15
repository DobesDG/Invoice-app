'use client'

import { useEffect, useState } from 'react';
import { Header } from '@/app/components/Header';
import arrow_left from '@/app/public/assets/icon-arrow-left.svg'
import Image from 'next/image';
import Link from 'next/link';

interface Invoice {
    _id: string;
    status: string;
    pay_from: {
      streed_ad_from: string;
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
      payment: string;
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
        <div className="flex flex-row bg-dark-purple">
         <Header/>
         <section className="flex flex-col justify-start pt-16 items-center w-full min-h-[100vh] tracking-[-0.25px] pl-[103px] hover:cursor-pointer">
            <section className="flex flex-row text-white justify-between w-[730px] mb-14">
                <div className='hover:cursor-pointer pt-3 pb-8'>
                    <Link href={'/'} className='flex flex-row items-baseline gap-4'>
                        <Image className='w-[7px] h-[10px]' src={arrow_left} alt="" width={7} height={10} />
                        <p className="text-[12px] font-bold tracking-tight">Go back</p>
                    </Link>
                </div>
            </section>
            <section>

            </section>
            <section>

            </section>
         </section>
        </div>
    );
}
