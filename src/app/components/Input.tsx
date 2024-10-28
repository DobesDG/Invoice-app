import { forwardRef, ForwardRefExoticComponent, HTMLProps, Ref } from "react"
import { FieldError } from "react-hook-form";


interface InputProps extends HTMLProps<HTMLInputElement> {
    label: string,
    error?: FieldError
}

export const Input: ForwardRefExoticComponent<InputProps> = forwardRef((props: InputProps, ref:Ref<HTMLInputElement>) => {
    const {label, error, ...InputProps} = props;

    return (
        <div>
            <div>
                <label htmlFor="">{label}</label>
                {error?.type == 'required' && (<p>required</p>)}
            </div>
            <input {...InputProps} ref={ref}/>
        </div>
    );
});