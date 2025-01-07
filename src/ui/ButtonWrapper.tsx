import { ReactNode } from "react";
import { Container, styled } from "@mui/material";

type FormElementsProps = {
    children: ReactNode;
}

 const FlexContainer = styled(Container)(({theme}) => ({
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     marginTop: '10px',
     gap: theme.spacing(5),
 }))

export const ButtonWrapper = ({children}: FormElementsProps) => {
    return (
        <FlexContainer>
            {children}
        </FlexContainer>
    )
};