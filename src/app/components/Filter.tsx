import React, { useEffect, MutableRefObject, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface FilterProps {
    label: string;
    value: string[];  
    setValue: React.Dispatch<React.SetStateAction<string[]>>;  
  }
  
  export const Filter: React.FC<FilterProps> = ({ label, value, setValue }) => {
    const theme = useContext(ThemeContext)

    const handleStatusChange = (label: string) => {
      if (value.includes(label)) {
        setValue(value.filter(s => s !== label));
      } else {
        setValue([...value, label]);
      }
    };
  
    return (
      <div className="hover:cursor-pointer w-full">
        <div className="flex flex-row group items-center gap-3" onClick={() => handleStatusChange(label)}>
            <div className="w-[19px] h-[19px] ">
              <input
              className={`appearance-none w-full h-full  rounded-sm border  border-dark-blue group-hover:border-violet hover:cursor-pointer checked:bg-violet checked:border-violet ${theme ? 'bg-dark-blue border-dark-blue' : 'bg-light-gray border-light-gray'}`}
              name={label}
              type="checkbox" 
              checked={value.includes(label)} 
              onChange={() => handleStatusChange(label)}
            />
            </div>
            <label className="text-xs font-bold hover:cursor-pointer" htmlFor={label}>{label}</label>
        </div>
      </div>
    );
  };
  