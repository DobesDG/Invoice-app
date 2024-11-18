import { useForm, SubmitHandler } from "react-hook-form";
import { useContext, useEffect } from "react";
import { MutableRefObject } from "react";
import { Input } from "./Input";
import { DateSelector } from "./DateSelector";
import { ItemList } from "./ItemList";
import { ThemeContext } from "./ThemeContext";
import Image from "next/image";
import arrow_left from "../public/assets/icon-arrow-left.svg"

export interface Invoice {
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
    data?: Invoice,
    restType: string,
    modalRef: MutableRefObject<HTMLDivElement | null>,
    onClose: () => void
}

export const CreateEdit: React.FC<CreateEditProps> = ({modalRef, onClose, restType, data}) => {

const defaultValues: Partial<Invoice> = restType === "edit" && data ? data : { item_list: [{ item_name: "", quant: 0, price: 0 }] };
const theme = useContext(ThemeContext)

const form = useForm<Invoice>({ defaultValues });
const { register, handleSubmit, setValue, getValues ,formState: { errors } } = form

const onSubmit: SubmitHandler<Invoice> = data => {

  if (restType == "create") {
    try {
      fetch(`/api/invoices/`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("Failed to create invoice:", error);
    }
    window.location.reload();
  }

  if (restType == "edit") {
    try {
      fetch(`/api/invoices/${data._id}?operation=editInvoice`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log("Failed to create invoice:", error);
    }
    window.location.reload();
  }
}

const handleSaveAsDraft = () => {
    setValue("status", "Draft");
    const data = getValues()
    const submit: SubmitHandler<Invoice> = data => {
      try {
        fetch(`/api/invoices/`, {
          method: "POST",
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.log("Failed to create invoice:", error);
      }
    };
    submit(data);
    window.location.reload();
};

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

    return (
      <section ref={modalRef} className="h-[100vh] overflow-y-scroll max-md:h-[95vh]">
        <div className={`p-6 flex flex-col h-fit w-[702px] max-xl:w-[619px] max-md:w-full ${theme ? 'bg-dark-purple' : 'bg-white'}`}>
          <div className='hover:cursor-pointer pt-3 pb-8'>
              <button onClick={onClose} className='flex flex-row items-baseline gap-4 md:hidden'>
                  <Image className='w-[7px] h-[10px]' src={arrow_left} alt="" width={7} height={10} />
                      <p className={`text-[12px] font-bold ${theme ? "text-white" : 'text-black'}`}>Go back</p>
              </button>
            </div>
          {restType == "create" && (
            <p className={`text-2xl font-bold tracking-[-1px] mb-6 ${theme ? 'text-white' : 'text-black'}`}>
              New Invoice
            </p>
          )}
          {restType == "edit" && (
            <p className={`text-2xl font-bold tracking-[-1px] mb-6 ${theme ? 'text-white' : 'text-black'}`}>
              Edit <span className="text-blue-steel">#</span>{data?._id}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <p className="text-violet text-xs font-bold tracking-[-0.25px] mb-6">
              Bill From
            </p>
            <Input
              label="Street Address"
              error={errors.pay_from?.street_ad_from}
              {...register("pay_from.street_ad_from", { required: true })}
            />
            <div className="grid grid-flow-col gap-2 max-md:grid-flow-row">
              <div className="max-md:col-start-2 max-md:row-start-1">
                <Input
                  label="City"
                  error={errors.pay_from?.city_from}
                  {...register("pay_from.city_from", { required: true })}
                />
              </div>
              <div className="max-md:row-start-2 max-md:col-span-2">
                <Input                  
                  label="Post Code"
                  error={errors.pay_from?.pcode_city_from}
                  {...register("pay_from.pcode_city_from", { required: true })}
                />
              </div>
              <div className="max-md:col-start-1 max-md:row-start-1">
                <Input
                  label="Country"
                  error={errors.pay_from?.country_from}
                  {...register("pay_from.country_from", { required: true })}
                />
              </div>
            </div>
            <p className="text-violet text-xs font-bold tracking-[-0.25px] mb-6">
              Bill To
            </p>
            <Input
              label="Client's name"
              error={errors.pay_to?.client_name}
              {...register("pay_to.client_name", { required: true })}
            />
            <Input
              label="Client's Email"
              error={errors.pay_to?.client_email}
              {...register("pay_to.client_email", { required: true })}
            />
            <Input
              label="Street Address"
              error={errors.pay_to?.street_ad_to}
              {...register("pay_to.street_ad_to", { required: true })}
            />
            <div className="grid grid-flow-col gap-2 max-md:grid-flow-row">
              <div className="max-md:col-start-2 max-md:row-start-1">
                <Input
                  label="City"
                  error={errors.pay_to?.city_to}
                  {...register("pay_to.city_to", { required: true })}
                />
              </div>
              <div className="max-md:row-start-2 max-md:col-span-2">
                <Input
                  label="Post Code"
                  error={errors.pay_to?.pcode_city_to}
                  {...register("pay_to.pcode_city_to", { required: true })}
                />
              </div>
              <div className="max-md:col-start-1 max-md:row-start-1">
                <Input
                  label="Country"
                  error={errors.pay_to?.country_to}
                  {...register("pay_to.country_to", { required: true })}
                />
              </div>
            </div>
            <DateSelector register={register} errors={errors.pay_to?.payment} />
            <Input
              label="Project Description"
              error={errors.pay_to?.description}
              {...register("pay_to.description", { required: true })}
            />
            <ItemList form={form} />
            {restType == "create" && (
              <div className="flex mt-16 justify-between items-center max-xl:mt-12 max-xl:mb-16 max-md:mt-8 max-md:mb-12">
                <button
                  className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold bg-light-red rounded-full max-md:py-[11.25px] max-md:px-[18px]"
                  type="button"
                  onClick={() => onClose()}
                >
                  Discard
                </button>
                <div className="flex gap-2 items-center">
                  <button
                    className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold rounded-full bg-dark-violet max-md:py-[11.25px] max-md:px-[18px]"
                    type="button"
                    onClick={handleSaveAsDraft}
                  >
                    Save as Draft
                  </button>
                  <button
                    className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold bg-violet rounded-full max-md:py-[11.25px] max-md:px-[18px]"
                    type="submit"
                    onClick={() => setValue("status", "Pending")}
                  >
                    Save and Send
                  </button>
                </div>
              </div>
            )}
            {restType == "edit" && (
              <div className="flex mt-16 justify-end gap-2 items-center">
                <button
                  className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold bg-light-red rounded-full"
                  type="button"
                  onClick={() => onClose()}
                >
                  Cancel
                </button>
                <button
                  className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold bg-violet rounded-full"
                  type="submit"
                  onClick={() => setValue("status", "Pending")}
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    );
}