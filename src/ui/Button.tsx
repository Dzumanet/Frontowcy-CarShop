import { Button as MUIButton } from "@mui/material";
import { ReactNode } from "react";

type ButtonProps = {
    type: 'submit' | 'button';
    children: ReactNode;
    color: 'primary' | 'warning';
    onClick?: () => void;
}

export const Button = ({ children, type = 'button', color = 'primary'}: ButtonProps) => {
    return <MUIButton variant='outlined' type={type} size="small" color={color}>{children}</MUIButton>;
};