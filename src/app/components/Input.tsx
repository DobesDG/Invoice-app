import { forwardRef, ForwardRefExoticComponent, HTMLProps, Ref, useContext } from "react"
import { FieldError } from "react-hook-form";
import { ThemeContext } from "./ThemeContext";


interface InputProps extends HTMLProps<HTMLInputElement> {
    label: string,
    error?: FieldError
}

export const Input: ForwardRefExoticComponent<InputProps> = forwardRef((props: InputProps, ref:Ref<HTMLInputElement>) => {
    const {label, error, ...InputProps} = props;
    const theme = useContext(ThemeContext)

    return (
        <div className={`flex flex-col text-xs mb-6 ${theme ? 'text-white' : 'text-blue-steel'}`}>
            <div className="flex flex-row justify-between mb-3">
                <label htmlFor="">{label}</label>
                {error?.type == 'required' && (
                    <p className="text-[10px] text-light-red">Can't be empty</p>
                    )}
            </div>
            <input className={`py-[15px] px-[18px] font-bold border rounded max-xl:px-[10px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${theme ? 'bg-dark-blue border-light-purple' : 'bg-white border-light-gray text-black'}`} {...InputProps} ref={ref}/>
        </div>
    );  
});