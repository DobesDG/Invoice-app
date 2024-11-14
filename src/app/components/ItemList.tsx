import trash from "../public/assets/trash.svg";
import Image from "next/image";
import { Input } from "./Input";
import { FieldError , UseFormRegister, UseFormGetValues } from "react-hook-form";
import React from "react";

interface ItemListProps {
    register: UseFormRegister<any>,
    getValues: UseFormGetValues<any>,
    item_error: FieldError | undefined,
    quant_error: FieldError | undefined,
    price_error: FieldError | undefined,
}

export const ItemList: React.FC<ItemListProps> = ({register, getValues , item_error, quant_error, price_error}) => {
    return(
        <>
            <p className="text-default-gray text-xs font-bold tracking-[-0.25px] mb-6">Item List</p>
            <div className="flex flex-row w-full justify-between items-center">
                <Input label="Item Name" error={item_error} {...register("item_list.0.item_name", { required: true })}/>
                <Input label="Qty." error={quant_error} {...register("item_list.0.quant", { required: true })}/>
                <Input label="Price" error={quant_error} {...register("item_list.0.price", { required: true })}/>
                <div className="flex flex-col text-white text-xs mb-6">
                    <label>Total</label>
                    <p className="py-[15px] px-[18px] font-bold">${(getValues("item_list.0.quant")*getValues("item_list.0.price")).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <Image src={trash} width={13} height={11} alt=''/>
            </div>
        </>
    )
}