import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { MutableRefObject } from "react";
import { Input } from "./Input";

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
const onSubmit: SubmitHandler<Invoice> = data => console.log({data});
console.log({errors})

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
            <div className="p-12 flex flex-col bg-dark-purple h-[1400px] w-[702px]">
                <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col">  
                    
                    <Input label="status" error={errors.status} {...register("status", { required: true })} />
                    
                    
                    <input type="submit" />
                </form>
            </div>
        </section>
    )
}