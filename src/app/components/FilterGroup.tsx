import { MutableRefObject, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Filter } from "./Filter";
import arrow_down from '../public/assets/icon-arrow-down.svg'
import { ThemeContext } from "./ThemeContext";

interface FilterGroupProps {
    statusValue: string[];
    setStatusValue: React.Dispatch<React.SetStateAction<string[]>>;
    modalRef: MutableRefObject<HTMLDivElement | null>;

}

export const FilterGroup: React.FC<FilterGroupProps> = ({statusValue, setStatusValue,modalRef}) => {
    const [filterOn,setFilterOn] = useState(false)
    const theme = useContext(ThemeContext)

      useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
              setFilterOn(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modalRef, setFilterOn]);
      

    return (
        <button className="flex flex-row items-baseline gap-3 relative z-0" onClick={() => setFilterOn(true)}>
            <p className="text-[12px] font-bold tracking-normal">
              <span className="max-md:hidden">Filter by status</span>
              <span className="md:hidden">Filter</span>
            </p>
            <Image className={`h-[7px] transform transition-transform duration-300 ${filterOn ? 'scale-y-[-1]' : ''}`} src={arrow_down} width={11} alt=""/>
            {filterOn && (
              <div ref={modalRef} className={`absolute flex flex-col justify-between items-start p-6 mt-6 w-48 h-32 top-[100%] left-[-50%] shadow-filterShadow rounded-lg cursor-default ${theme? 'bg-light-purple' : 'bg-white' }`}>
                <Filter label="Draft" value={statusValue} setValue={setStatusValue}/>
                <Filter label="Pending" value={statusValue} setValue={setStatusValue}/>
                <Filter label="Paid" value={statusValue} setValue={setStatusValue}/>
              </div>
              )}
          </button> 
    )
}