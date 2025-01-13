import { PartDTO } from "../../types";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input.tsx";
import { Button, Container } from "@mui/material";
import { ButtonWrapper } from "../../ui/ButtonWrapper.tsx";

type PartFormProps = {
    defaultValues: PartDTO;
    onSubmit: (data: PartDTO) => void;
    label: string;
    onDelete?: () => void;
}

export const PartForm = ({ defaultValues, onSubmit, label, onDelete }: PartFormProps) => {
    const { register, handleSubmit } = useForm<PartDTO>({ defaultValues });

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input type="text" label="Name" {...register('name')} required />
                </div>
                <div>
                    <Input type="number" label="Price" {...register('price')} required />
                </div>
                <div>
                    <Input type="text" label="Part Name Id" {...register('partNameId')}
                           required
                           disabled={Boolean(defaultValues?.partNameId)}
                    />
                </div>
                <div>
                    <Input type="text" label="CategoryId" {...register('categoryId')} disabled />
                </div>
                <ButtonWrapper>
                    {onDelete && (
                        <Button type="button" variant="outlined" size="small" color="warning" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                    <Button type="submit" variant="outlined" size="small">{label}</Button>
                </ButtonWrapper>
            </form>
        </Container>
    );
};