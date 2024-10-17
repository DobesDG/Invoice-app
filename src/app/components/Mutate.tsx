
interface MutateProps {
    invoiceId: string;
    invoiceStatus: string;  
  }
  
  export const Mutate: React.FC<MutateProps> = ({ invoiceId, invoiceStatus }) => {
    const isPending = invoiceStatus == 'Pending'
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/delete/${invoiceId}`,{ method: 'DELETE' });
            if (!response.ok) throw new Error('Error deleting data');
        } catch (error) {
            console.log('Failed to delete invoice:', error)
        }
    };

    const handleMark = async () => {
        try {
            const response = await fetch(`/api/markpaid/${invoiceId}`,{ method: 'PATCH' });
            if (!response.ok) throw new Error('Error updating data');
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
            onClick={handleDelete}>
                Delete
            </button>
            {isPending && <button className="px-6 bg-violet rounded-3xl transition-all duration-200 ease-in-out hover:bg-light-violet" 
            onClick={handleMark}>
                Mark as Paid
            </button>}
        </div>
    );
  };
  