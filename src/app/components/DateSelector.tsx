import React, { useState, useRef, useEffect, useContext } from "react";
import { FieldError , UseFormRegister } from "react-hook-form";
import { Input } from "./Input";
import { format, add, differenceInDays } from 'date-fns'
import { DayPicker } from "react-day-picker";
import calendar from "../public/assets/calendar.svg"
import Image from "next/image";
import "react-day-picker/style.css";
import { ThemeContext } from "./ThemeContext";

interface DateSelectorProps {
    register: UseFormRegister<any>,
    errors: FieldError | undefined
}

export const DateSelector: React.FC<DateSelectorProps> = ({register, errors}) => {
    const [selected, setSelected] = useState<Date>(add(new Date(), {days: 1}));
    const [pickerOn, setPickerOn] = useState(false);
    const [focused, setFocused] = useState(false);
    const [payTerms, setPayTerms] = useState(differenceInDays(selected,new Date()));
    const inputDivRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const theme = useContext(ThemeContext)
    
    const handlePayTerms = (days: string) => {
        const numDays = days.slice(0, 3)
        setSelected(add(new Date(), { days: Number(numDays) }))
        setPayTerms(Number(numDays))
    }

    const handleDate = (date:Date) => {
        setSelected(date)
        setPayTerms(differenceInDays(date, new Date()))
    }

    const handleInputDiv = () => {
        setPickerOn(prev => !prev)
        setFocused(prev => !prev)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputDivRef.current &&
                calendarRef.current &&
                !inputDivRef.current.contains(event.target as Node) &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setPickerOn(false);
                setFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div>
            <div className="relative">
                <div className={`flex flex-col text-xs mb-6 ${theme ? 'text-white' : 'text-blue-steel'}`}>
                    <div className="flex flex-row justify-between mb-3">
                        <label htmlFor="">Invoice Date</label>
                    </div>
                    <div
                        ref={inputDivRef}
                        className={`flex flex-row justify-between w-full items-center py-[15px] px-[18px] font-bold border rounded max-xl:px-[10px] ${
                            focused ? theme ? 'border-white' : 'border-black' : theme ? 'border-light-purple' : 'border-light-gray'} ${theme ? 'bg-dark-blue' : 'bg-white'}`}
                        onClick={handleInputDiv}>
                        <input className={`font-bold focus:outline-none border-none ${theme ? 'bg-dark-blue' : 'bg-white text-black'}`} value={format(selected,'dd MMM yyyy')} readOnly/>
                        <Image className="hover:cursor-pointer" src={calendar} width={16} height={16} alt=""/>
                    </div>
                </div>
                {pickerOn && (
                    <div ref={calendarRef} className="absolute top-[85px]">
                        <DayPicker
                            classNames={{
                            root:'w-[240px] h-[259px] p-6 text-white text-xs font-bold bg-dark-blue rounded-md relative z-0',
                            months:'flex flex-col z-10 relative top-[-20px]', 
                            nav:'z-10 flex flex-row relative justify-between top-[20px]' ,
                            month_caption:'text-center mb-4', 
                            weeks:'grid gap-y-[1rem]',
                            month_grid:'grid justify-center w-full', 
                            weekdays:'grid grid-flow-col justify-between',
                            weekday: 'disable',
                            day_button:'justify-center w-[27.42px] hover:text-[#7c5dfa]',
                            selected:'text-[#7c5dfa]',
                            outside:'text-gray-500 opacity-50',
                            chevron:'fill-[#7c5dfa] w-[17px] h-[23px]'
                            }}
                        mode="single" hideWeekdays fixedWeeks showOutsideDays month={selected} onMonthChange={setSelected} selected={selected} onSelect={handleDate} required/>
                    </div>)}
            </div>
            <Input label="Payment Terms" type="number" error={errors} value={payTerms} {...register("pay_to.payment", { onChange: (e) => handlePayTerms(e.target.value) })}/>
        </div>
    )

}