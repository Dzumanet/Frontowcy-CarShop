import { CategoryDTO } from "../../types";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input.tsx";
import { Button, Container } from "@mui/material";
import { ButtonWrapper } from "../../ui/ButtonWrapper.tsx";

type CategoryFormProps = {
    defaultValues: CategoryDTO;
    onSubmit: (data: CategoryDTO) => void;
    label: string;
    onDelete?: () => void;
}


export const CategoryForm = ({ defaultValues, onSubmit, label, onDelete }: CategoryFormProps) => {
    const { register, handleSubmit } = useForm<CategoryDTO>({ defaultValues });


    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input type="text" label="Name" {...register('name')} required />

                </div>
                <div>
                    <Input type="text" label="Identifier" {...register('identifier')} required />

                </div>
                <div>
                    <Input type="text" label="Position" {...register('position')} required />

                </div>
                <ButtonWrapper>
                    {onDelete && (
                        <Button type="button" variant="outlined" size="small" color="warning" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                    <Button variant="outlined" type="submit">{label}</Button>
                </ButtonWrapper>
            </form>
        </Container>
    );
};