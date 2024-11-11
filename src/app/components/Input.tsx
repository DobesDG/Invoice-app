import { forwardRef, ForwardRefExoticComponent, HTMLProps, Ref } from "react"
import { FieldError } from "react-hook-form";


interface InputProps extends HTMLProps<HTMLInputElement> {
    label: string,
    error?: FieldError
}

export const Input: ForwardRefExoticComponent<InputProps> = forwardRef((props: InputProps, ref:Ref<HTMLInputElement>) => {
    const {label, error, ...InputProps} = props;

    return (
        <div className="flex flex-col text-white text-xs mb-6">
            <div className="flex flex-row justify-between mb-3">
                <label htmlFor="">{label}</label>
                {error?.type == 'required' && (
                    <p className="text-[10px] text-light-red">Can't be empty</p>
                    )}
            </div>
            <input className="py-[15px] px-[18px] font-bold bg-dark-blue border-light-purple border rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...InputProps} ref={ref}/>
        </div>
    );
});