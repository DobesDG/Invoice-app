import { MutableRefObject, useContext, useState } from "react";
import Image from "next/image";
import { Filter } from "./Filter";
import arrow_down from '../public/assets/icon-arrow-down.svg'
import { ThemeContext } from "./ThemeContext";

interface FilterGroupProps {
    statusValue: string[];
    setStatusValue: React.Dispatch<React.SetStateAction<string[]>>;
    modalRef: MutableRefObject<HTMLDivElement | null>;
}

export const FilterGroup: React.FC<FilterGroupProps> = ({statusValue, setStatusValue, modalRef}) => {
    const [filterOn,setFilterOn] = useState(false)
    const theme = useContext(ThemeContext)

    const handleFilter = () => {
        setFilterOn(!filterOn)
      }

    return (
        <button className="flex flex-row items-baseline gap-3 relative z-0" onClick={handleFilter}>
            <p className="text-[12px] font-bold tracking-normal">Filter by status</p>
            <Image className={`h-[7px] transform transition-transform duration-300 ${filterOn ? 'scale-y-[-1]' : ''}`} src={arrow_down} width={11} alt=""/>
            {filterOn && (
              <div ref={modalRef} className={`absolute flex flex-col justify-between items-start p-6 mt-6 w-48 h-32 top-[100%] left-[-50%] shadow-filterShadow rounded-lg cursor-default ${theme? 'bg-light-purple' : 'bg-white' }`}>
                <Filter label="Draft" value={statusValue} setValue={setStatusValue} onClose={handleFilter} filterOn={setFilterOn} modalRef={modalRef}/>
                <Filter label="Pending" value={statusValue} setValue={setStatusValue} onClose={handleFilter} filterOn={setFilterOn} modalRef={modalRef}/>
                <Filter label="Paid" value={statusValue} setValue={setStatusValue} onClose={handleFilter} filterOn={setFilterOn} modalRef={modalRef}/>
              </div>
              )}
          </button> 
    )
}