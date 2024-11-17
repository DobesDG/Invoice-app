import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CreateEdit, Invoice } from "./CreateEdit";
import { ThemeContext } from "./ThemeContext";

interface MutateProps {
    data: Invoice,
    invoiceId: string;
    invoiceStatus: string;  
  }

interface DeleteProps {
    invoiceId: string;
    handler : () => void;
    onClose: () => void;
}
  
  export const Mutate: React.FC<MutateProps> = ({ data, invoiceId, invoiceStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isPending = invoiceStatus == 'Pending';
    const route = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);
    const [editInvoice, setEditInvoice] = useState(false);
    const theme = useContext(ThemeContext)
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/invoices/${invoiceId}`,{ method: 'DELETE' });
            if (!response.ok) throw new Error('Error deleting data');
            setIsModalOpen(false);
            route.push("/")
        } catch (error) {
            console.log('Failed to delete invoice:', error)
        }
    };
    
    const handleMark = async () => {
        try {
            const response = await fetch(`/api/invoices/${invoiceId}?operation=changeStatus`,{ method: 'PATCH' });
            if (!response.ok) throw new Error('Error updating data');
            window.location.reload();
        } catch (error) {
            console.log('Failed to update invoice:', error)
        }
    };
    

    return (
      <div className="flex flex-row text-[12px] leading-[15px] font-bold gap-2 h-[48px]">
        <button
          className={`px-6 rounded-3xl transition-all duration-200 ease-in-out ${theme ? 'bg-light-purple hover:bg-white hover:text-gray-200' : 'bg-transp-white hover:bg-indigo-100'}`}
          onClick={() => setEditInvoice(!editInvoice)}
        >
          Edit
        </button>
        <button
          className="px-6 text-white bg-light-red rounded-3xl transition-all duration-200 ease-in-out hover:bg-red-300"
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
        {isPending && (
          <button
            className="px-6 text-white bg-violet rounded-3xl transition-all duration-200 ease-in-out hover:bg-light-violet"
            onClick={handleMark}
          >
            Mark as Paid
          </button>
        )}
        {isModalOpen && (
          <DeleteModal
            invoiceId={invoiceId}
            handler={handleDelete}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {editInvoice && (
          <section className="fixed flex flex-row justify-start items-start z-10 w-full h-full top-0 left-[6.4375rem] right-0 bg-45%-transp">
            <CreateEdit
              data={data}
              restType="edit"
              modalRef={modalRef}
              onClose={() => setEditInvoice(!editInvoice)}
            />
          </section>
        )}
      </div>
    );
  };


const DeleteModal: React.FC<DeleteProps> = ({ invoiceId , handler, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const theme = useContext(ThemeContext)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <section className="fixed flex flex-row justify-center items-center z-10 w-full h-full top-0 left-0 right-0 bg-45%-transp">
            <div ref={modalRef} className={`p-12 flex flex-col w-[480px] rounded-lg ${theme ? 'bg-dark-blue' : 'bg-white'}`}>
                <h3 className={`text-[32px] leading-[36px] tracking-[-1px] mb-2 ${theme ? 'text-steel-blue ' : 'text-black'}`}>Confirm Deletion</h3>
                <p className="font-normal text-steel-blue leading-[22px] mb-4">Are your sure your want to delete invoice #{invoiceId}? This action cannot be undone.</p>
                <div className="flex flex-row text-[12px] leading-[15px] font-bold gap-2 h-[48px] justify-end">
                    <button 
                        className={`px-6 rounded-3xl transition-all duration-200 ease-in-out ${theme ? 'bg-light-purple hover:bg-white hover:text-gray-200' : 'bg-transp-white hover:bg-indigo-100'}`}
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-6 text-white bg-light-red rounded-3xl transition-all duration-200 ease-in-out hover:bg-red-300" 
                    onClick={handler}>
                        Delete
                    </button>
                </div>
            </div>
        </section>
    )
        
}
  