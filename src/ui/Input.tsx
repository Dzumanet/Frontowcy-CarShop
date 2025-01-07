import { forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { TextField } from "@mui/material";



type InputProps = {
    label: string;
    type: "text" | "number";
    error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps & UseFormRegisterReturn>(({ label, type, error, ...register }, ref) => {

    return (
        <div>
            <TextField
                variant='filled'
                fullWidth
                label={label}
                type={type}
                error={!!error}
                helperText={error?.message}
                ref={ref} {...register}/>

        </div>
    )
});