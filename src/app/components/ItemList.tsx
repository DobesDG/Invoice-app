import trash from "../public/assets/trash.svg";
import Image from "next/image";
import { Input } from "./Input";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import React from "react";
import { Invoice } from "./CreateEdit";

interface ItemListProps {
    form: UseFormReturn<Invoice>
}

export const ItemList: React.FC<ItemListProps> = ({ form }) => {
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
              className="flex flex-row w-full justify-between items-center gap-4"
            >
              <div className="w-[40%]">
                <Input
                  label="Item Name"
                  error={errors.item_list?.[index]?.item_name}
                  {...register(
                    `item_list.${index}.item_name` as "item_list.0.item_name",
                    { required: true }
                  )}
                />
              </div>
              <div className="w-[15%]">
                <Input
                  label="Qty."
                  error={errors.item_list?.[index]?.quant}
                  {...register(
                    `item_list.${index}.quant` as "item_list.0.quant",
                    { required: true }
                  )}
                />
              </div>
              <div className="w-[15%]">
                <Input
                  label="Price"
                  error={errors.item_list?.[index]?.price}
                  {...register(
                    `item_list.${index}.price` as "item_list.0.price",
                    { required: true }
                  )}
                />
              </div>
              <div className="flex flex-col text-white text-xs mb-6 w-[22%]">
                <label className="flex flex-row justify-between mb-3">
                  Total
                </label>
                <p className="flex py-[15px] px-[18px] font-bold items-end justify-center">
                  $
                  {( 
                    getValues(`item_list.${index}.quant` as "item_list.0.quant") * getValues(`item_list.${index}.price` as "item_list.0.price")
                    ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="w-[8%]">
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
          ))}
          <button
            className="flex items-center gap-1 justify-center py-[15px] px-[18px] text-white text-xs font-bold bg-dark-blue rounded-full ease-in-out hover:bg-violet hover:transition-all"
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