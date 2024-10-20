import React from "react";
import { useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";

interface MutateProps {
    invoiceId: string;
    invoiceStatus: string;  
  }

interface DeleteProps {
    invoiceId: string;
    handler : () => void;
    onClose: () => void;
}
  
  export const Mutate: React.FC<MutateProps> = ({ invoiceId, invoiceStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isPending = invoiceStatus == 'Pending';
    const route = useRouter()
    
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
            const response = await fetch(`/api/invoices/${invoiceId}`,{ method: 'PATCH' });
            if (!response.ok) throw new Error('Error updating data');
            window.location.reload();
        } catch (error) {
            console.log('Failed to update invoice:', error)
        }
    };
    

    return(
        <div className="flex flex-row text-[12px] leading-[15px] font-bold gap-2 h-[48px]">
            <button className="px-6 bg-light-purple rounded-3xl transition-all duration-200 ease-in-out hover:bg-white hover:text-gray-200">
                Edit
            </button>
            <button className="px-6 bg-light-red rounded-3xl transition-all duration-200 ease-in-out hover:bg-red-300" 
            onClick={() => setIsModalOpen(true)}>
                Delete
            </button>
            {isPending && <button className="px-6 bg-violet rounded-3xl transition-all duration-200 ease-in-out hover:bg-light-violet" 
            onClick={handleMark}>
                Mark as Paid
            </button>}
            {isModalOpen && (
                <DeleteModal invoiceId={invoiceId} handler={handleDelete} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
  };


const DeleteModal: React.FC<DeleteProps> = ({ invoiceId , handler, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

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
            <div ref={modalRef} className="p-12 flex flex-col bg-dark-blue w-[480px] rounded-lg">
                <h3 className="text-[32px] leading-[36px] tracking-[-1px] mb-2">Confirm Deletion</h3>
                <p className="font-normal text-steel-blue leading-[22px] mb-4">Are your sure your want to delete invoice #{invoiceId}? This action cannot be undone.</p>
                <div className="flex flex-row text-[12px] leading-[15px] font-bold gap-2 h-[48px] justify-end">
                    <button 
                        className="px-6 bg-light-purple rounded-3xl transition-all duration-200 ease-in-out hover:bg-white hover:text-gray-200"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button className="px-6 bg-light-red rounded-3xl transition-all duration-200 ease-in-out hover:bg-red-300" 
                    onClick={handler}>
                        Delete
                    </button>
                </div>
            </div>
        </section>
    )
        
}
  