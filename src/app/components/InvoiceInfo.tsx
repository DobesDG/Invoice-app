import DateComponent from "./Date";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import arrow_right from '../public/assets/icon-arrow-right.svg';
import Image from "next/image";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

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

    const theme = useContext(ThemeContext)

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
            return theme ? ['bg-white','text-white','bg-transp-white'] : ['bg-gray-600','text-gray-600','bg-gray-100'];
          default:
            return '';
        }
      }

    return (
        <div onClick={() => handleNavigation(Id)} className={`flex flex-row border-[1px] p-6 rounded-lg mb-4 w-[730px] justify-between transition-all duration-300 ease-out  hover:border-violet max-lg:w-[672px] max-md:w-[87.5vw] max-md:h-[145px] hover:cursor-pointer ${theme ? "bg-dark-blue border-dark-blue" : "bg-white border-white shadow-filterShadow"}`}>
              <div className="flex flex-row justify-center items-center max-md:flex-col max-md:justify-between max-md:items-start">
                <div className="flex">
                  <span className="text-blue-steel text-xs font-bold">#</span>
                  <p className={`text-xs font-bold mr-7 max-md:mr-0 ${theme ? "text-white" : "text-black"}`}>{Id}</p>
                </div>
                <div className="max-md:flex-col">
                  <div className="flex max-md:mb-2">
                    <p className={`text-[0.6875rem] ${theme ? "text-white" : "text-blue-steel"}`}>Due <DateComponent dateString={DateString} days={Payment}/></p>
                  </div>
                  <p className={`text-base font-bold tracking-[-0.8px] md:hidden ${theme ? "text-white" : "text-black"}`}>
                      ${ItemList.reduce((acc, cur) => acc + cur.quant * cur.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
              <div className="flex flex-row justify-center items-center max-md:flex-col max-md:justify-between max-md:items-end">
                <div className="flex flex-row justify-between items-center w-[249px] max-lg:w-[215px] max-md:w-fit">
                  <p className={`text-[0.75rem] ${theme ? "text-white" : "text-blue-steel"}`}>{ClientName}</p>
                  <p className={`text-base font-bold tracking-[-0.8px] max-md:hidden ${theme ? "text-white" : "text-black"}`}>
                    ${ItemList.reduce((acc, cur) => acc + cur.quant * cur.price, 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className={`flex flex-row justify-center items-center h-10 w-[6.5rem] rounded-md ml-8 max-md:ml-0 ${colorStatus(Status)[2]}`}>
                  <div className="flex flex-row items-baseline">
                    <span className={`w-[8px] h-[8px] mr-[8px] ${colorStatus(Status)[0]} rounded-full`}></span>
                    <p className={`text-xs font-bold text-center ${colorStatus(Status)[1]}`}>{Status}</p>
                  </div>
                </div>
                  <Image className="ml-4 max-md:ml-0 max-md:hidden" src={arrow_right} alt="" width={7} height={11} />
              </div>
            </div>
    )
}

