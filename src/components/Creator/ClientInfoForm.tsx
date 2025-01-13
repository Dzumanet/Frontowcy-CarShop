import { Button, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input.tsx";
import { ButtonWrapper } from "../../ui/ButtonWrapper.tsx";
import { OrderDTO } from "../../types";

type ClientInfoFormProps = {
    defaultValues: OrderDTO;
    onSubmit: (data: OrderDTO) => void;
}


export const ClientInfoForm = ({ defaultValues, onSubmit }: ClientInfoFormProps) => {
    const { register, handleSubmit } = useForm<OrderDTO>({ defaultValues });

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input type="text" label="First Name" {...register('firstName')} required />
                </div>
                <div>
                    <Input type="text" label="Last Name" {...register('lastName')} required />
                </div>
                <div>
                    <Input type="text" label="E-mail" {...register('email')} required />
                </div>
                <ButtonWrapper>
                    <Button variant="outlined" type="submit">Save order</Button>
                </ButtonWrapper>
            </form>
        </Container>
    );
};