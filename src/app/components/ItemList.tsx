import trash from "../public/assets/trash.svg";
import Image from "next/image";
import { Input } from "./Input";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import React, { useContext } from "react";
import { Invoice } from "./CreateEdit";
import { ThemeContext } from "./ThemeContext";

interface ItemListProps {
    form: UseFormReturn<Invoice>
}

export const ItemList: React.FC<ItemListProps> = ({ form }) => {
    const theme = useContext(ThemeContext)
    const {register, getValues, formState: {errors}} = form
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "item_list",
      });
    return (
      <>
        <p className="text-default-gray text-lg font-bold tracking-[-0.25px] mb-6">
          Item List
        </p>
        <div className="flex flex-col">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-row w-full justify-between items-center gap-4 max-md:flex-col max-md:gap-0"
            >
              <div className="w-[40%] max-md:w-full">
                <Input
                  label="Item Name"
                  error={errors.item_list?.[index]?.item_name}
                  {...register(
                    `item_list.${index}.item_name` as "item_list.0.item_name",
                    { required: true }
                  )}
                />
              </div>
              <div className="flex flex-row w-[60%] gap-4 items-center max-md:w-full">                
                <div className="w-[25%]">
                  <Input
                    label="Qty."
                    error={errors.item_list?.[index]?.quant}
                    {...register(
                      `item_list.${index}.quant` as "item_list.0.quant",
                      { required: true }
                    )}
                  />
                </div>
                <div className="w-[25%]">
                  <Input
                    label="Price"
                    error={errors.item_list?.[index]?.price}
                    {...register(
                      `item_list.${index}.price` as "item_list.0.price",
                      { required: true }
                    )}
                  />
                </div>
                <div className={`flex flex-col text-xs mb-6 w-[30%] ${theme ? 'text-white' : 'text-blue-steel'}`}>
                  <label className="flex flex-row justify-between mb-3">
                    Total
                  </label>
                  <p className="flex py-[15px] px-[18px] font-bold items-end justify-center max-xl:px-[10px]">
                    $
                    {( 
                      getValues(`item_list.${index}.quant` as "item_list.0.quant") * getValues(`item_list.${index}.price` as "item_list.0.price")
                      ).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="w-[10%]">
                  {fields.length != 1 && (
                    <Image
                      className="hover:cursor-pointer"
                      onClick={() => remove(index)}
                      src={trash}
                      width={13}
                      height={11}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            className={`flex items-center gap-1 justify-center py-[15px] px-[18px] text-xs font-bold rounded-full ease-in-out  hover:transition-all max-md:py-[11.25px] max-md:px-[18px] ${theme ? 'bg-dark-blue text-white hover:bg-violet' : 'bg-gray-50 hover:bg-indigo-100 text-blue-steel'}`}
            type="button"
            onClick={() => append({ item_name: "", quant: 0, price: 0 })}
          >
            <span className="text-xl">+</span>
            <span>Add New Items</span>
          </button>
        </div>
      </>
    );
}