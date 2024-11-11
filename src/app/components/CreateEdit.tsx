import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { MutableRefObject } from "react";
import { Input } from "./Input";
import { format, add, differenceInDays } from 'date-fns'
import { DayPicker } from "react-day-picker";
import calendar from "../public/assets/calendar.svg"
import Image from "next/image";
import "react-day-picker/style.css";

interface Invoice {
    _id: string,
    status: string ,
    pay_from:{
      street_ad_from: string,
      city_from: string,
      pcode_city_from: string,
      country_from: string
    },
    pay_to: {
      client_name:string,
      client_email: string,
      street_ad_to: string,
      city_to:string,
      pcode_city_to: string,
      country_to: string,
      payment:number,
      description: string
    },
    date_added: string,
    item_list: [
      {
          item_name: string,
          quant:  number,
          price: number
      }
    ]
}

interface CreateEditProps {
    modalRef: MutableRefObject<HTMLDivElement | null>,
    onClose: () => void
}



export const CreateEdit: React.FC<CreateEditProps> = ({modalRef, onClose}) => {
const { register, handleSubmit, formState: { errors } } = useForm<Invoice>();
const [selected, setSelected] = useState<Date>(add(new Date(), {days: 1}));
const [pickerOn, setPickerOn] = useState(false);
const [focused, setFocused] = useState(false);
const [payTerms, setPayTerms] = useState(differenceInDays(selected,new Date()));
const onSubmit: SubmitHandler<Invoice> = data => console.log({data});

const handlePayTerms = (days: string) => {
    setSelected(add(new Date(), {days: Number(days)}))
    setPayTerms(Number(days))
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
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose();
        }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [modalRef, onClose]);

    return(
        <section ref={modalRef} className="h-[100vh] overflow-y-scroll">
            <div className="p-6 flex flex-col bg-dark-purple h-[1400px] w-[702px]">
                <p className="text-white text-2xl font-bold tracking-[-1px] mb-6">New Invoice</p>
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col">  
                    <p className="text-violet text-xs font-bold tracking-[-0.25px] mb-6">Bill From</p>
                    <Input label="Street Address" error={errors.pay_from?.street_ad_from} {...register("pay_from.street_ad_from", { required: true })} />
                    <div className="grid grid-flow-col gap-2">
                        <Input label="City" error={errors.pay_from?.city_from} {...register("pay_from.city_from", { required: true })}/>
                        <Input label="Post Code" error={errors.pay_from?.pcode_city_from} {...register("pay_from.pcode_city_from", { required: true })}/>
                        <Input label="Country" error={errors.pay_from?.country_from} {...register("pay_from.country_from", { required: true })}/>
                    </div>
                    <p className="text-violet text-xs font-bold tracking-[-0.25px] mb-6">Bill To</p>
                    <Input label="Client's name" error={errors.pay_to?.client_name} {...register("pay_to.client_name", { required: true })} />
                    <Input label="Client's Email" error={errors.pay_to?.client_email} {...register("pay_to.client_email", { required: true })} />
                    <Input label="Street Address" error={errors.pay_to?.street_ad_to} {...register("pay_to.street_ad_to", { required: true })} />
                    <div className="grid grid-flow-col gap-2">
                        <Input label="City" error={errors.pay_to?.city_to} {...register("pay_to.city_to", { required: true })}/>
                        <Input label="Post Code" error={errors.pay_to?.pcode_city_to} {...register("pay_to.pcode_city_to", { required: true })}/>
                        <Input label="Country" error={errors.pay_to?.country_to} {...register("pay_to.country_to", { required: true })}/>
                    </div>
                    <div>
                        <div className="flex flex-col text-white text-xs mb-6">
                            <div className="flex flex-row justify-between mb-3">
                                <label htmlFor="">Invoice Date</label>
                            </div>
                            <div
                                className={`flex flex-row justify-between w-full items-center py-[15px] px-[18px] font-bold bg-dark-blue border rounded ${
                                    focused ? 'border-white' : 'border-light-purple'
                                }`}
                                onClick={handleInputDiv}
                                onBlur={handleInputDiv}
                                tabIndex={0}>
                                <input className="font-bold bg-dark-blue focus:outline-none border-none" value={format(selected,'dd MMM yyyy')} readOnly/>
                                <Image src={calendar} width={16} height={16} alt=""/>
                            </div>
                        </div>
                        {pickerOn && (<DayPicker className=""
                        mode="single" month={selected} onMonthChange={setSelected} selected={selected} onSelect={handleDate} required/>)}
                    </div>
                    <Input label="Payment Terms" type="number" error={errors.pay_to?.payment} value={payTerms} {...register("pay_to.payment", { onChange: (e) => handlePayTerms(e.target.value)})}/>
                    <Input label="Project Description" error={errors.pay_to?.description} {...register("pay_to.description", { required: true })}/>
                    <input type="submit"/>  
                </form>
            </div>
        </section>
    )
}