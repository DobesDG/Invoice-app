import DateComponent from "./Date";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import arrow_right from '../public/assets/icon-arrow-right.svg';
import Image from "next/image";

interface InvoiceInfoProps {
    router: AppRouterInstance,
    Id: string,
    Status: string,
    DateString: string,
    ClientName: string,
    ItemList: [{
        item_name: string,
        quant: number,
        price: number
    }],
    Payment: number

}


export const InvoiceInfo: React.FC<InvoiceInfoProps> = ({router, Id, Status, DateString, ClientName, ItemList, Payment}) => {

    const handleNavigation = (invoiceId: string) => {
        router.push(`/invoices/${invoiceId}`);
    };

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

    return (
        <div onClick={() => handleNavigation(Id)} className="flex flex-row bg-dark-blue border-dark-blue border-[1px] p-6 rounded-lg mb-4 w-[730px] justify-between transition-all duration-300 ease-out shadow-none hover:border-violet max-xl:w-[672px] hover:cursor-pointer">
              <div className="flex flex-row justify-center items-center">
                <span className="text-blue-steel text-xs font-bold">#</span>
                <p className="text-white text-xs font-bold mr-7">{Id}</p>
                <p className="text-white text-[0.6875rem]">Due <DateComponent dateString={DateString} days={Payment}/></p>
              </div>
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row justify-between items-center w-[249px] max-lg:w-[215px]">
                  <p className="text-white text-[0.75rem]">{ClientName}</p>
                  <p className="text-white text-base font-bold tracking-[-0.8px]">
                    ${ItemList.reduce((acc, cur) => acc + cur.quant * cur.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`flex flex-row justify-center items-center h-10 w-[6.5rem] rounded-md ml-8 ${colorStatus(Status)[2]}`}>
                  <div className="flex flex-row items-baseline">
                    <span className={`w-[8px] h-[8px] mr-[8px] ${colorStatus(Status)[0]} rounded-full`}></span>
                    <p className={`text-xs font-bold text-center ${colorStatus(Status)[1]}`}>{Status}</p>
                  </div>
                </div>
                  <Image className="ml-4" src={arrow_right} alt="" width={7} height={11} />
              </div>
            </div>
    )
}

