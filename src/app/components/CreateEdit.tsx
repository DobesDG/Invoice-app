import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { MutableRefObject } from "react";
import { Input } from "./Input";
import { DateSelector } from "./DateSelector";
import { ItemList } from "./ItemList";

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
    modalRef: MutableRefObject<HTMLDivElement | null>,
    onClose: () => void
}



export const CreateEdit: React.FC<CreateEditProps> = ({modalRef, onClose}) => {
const form = useForm<Invoice>({defaultValues: {item_list: [{item_name:'', quant: 0, price: 0}]}});
const { register, handleSubmit, setValue, getValues ,formState: { errors } } = form

const onSubmit: SubmitHandler<Invoice> = data => { try {
    fetch(`/api/invoices/`, {
      method: "POST",
      body: JSON.stringify(data)
    });
} catch (error) {
    console.log("Failed to create invoice:", error);
    };
    window.location.reload();
};

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
      <section ref={modalRef} className="h-[100vh] overflow-y-scroll">
        <div className="p-6 flex flex-col bg-dark-purple h-fit w-[702px]">
          <p className="text-white text-2xl font-bold tracking-[-1px] mb-6">
            New Invoice
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <p className="text-violet text-xs font-bold tracking-[-0.25px] mb-6">
              Bill From
            </p>
            <Input
              label="Street Address"
              error={errors.pay_from?.street_ad_from}
              {...register("pay_from.street_ad_from", { required: true })}
            />
            <div className="grid grid-flow-col gap-2">
              <Input
                label="City"
                error={errors.pay_from?.city_from}
                {...register("pay_from.city_from", { required: true })}
              />
              <Input
                label="Post Code"
                error={errors.pay_from?.pcode_city_from}
                {...register("pay_from.pcode_city_from", { required: true })}
              />
              <Input
                label="Country"
                error={errors.pay_from?.country_from}
                {...register("pay_from.country_from", { required: true })}
              />
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
            <div className="grid grid-flow-col gap-2">
              <Input
                label="City"
                error={errors.pay_to?.city_to}
                {...register("pay_to.city_to", { required: true })}
              />
              <Input
                label="Post Code"
                error={errors.pay_to?.pcode_city_to}
                {...register("pay_to.pcode_city_to", { required: true })}
              />
              <Input
                label="Country"
                error={errors.pay_to?.country_to}
                {...register("pay_to.country_to", { required: true })}
              />
            </div>
            <DateSelector register={register} errors={errors.pay_to?.payment} />
            <Input
              label="Project Description"
              error={errors.pay_to?.description}
              {...register("pay_to.description", { required: true })}
            />
            <ItemList form={form} />
            <div className="flex mt-16 justify-between items-center">
              <button
                className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold bg-light-red rounded-full"
                type="button"
                onClick={() => onClose()}
              >
                Discard
              </button>
              <div className="flex gap-2 items-center">
                <button
                  className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold rounded-full bg-dark-violet"
                  type="button"
                  onClick={handleSaveAsDraft}
                >
                  Save as Draft
                </button>
                <button
                  className="flex items-center justify-center py-[15px] px-[24px] text-white text-xs font-bold bg-violet rounded-full"
                  type="submit"
                  onClick={() => setValue("status", "Pending")}
                >
                  Save and Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
}