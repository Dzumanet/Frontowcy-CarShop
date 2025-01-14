import { PartDTO } from "../../types";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input.tsx";
import { Button, Container, FormControl } from "@mui/material";
import { ButtonWrapper } from "../../ui/ButtonWrapper.tsx";
import { validatePartNameIdUniqueness } from "../../utils/validatePartNameIdUniqueness.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { allPartsOptions } from "../../queries/allParts.ts";

type PartFormProps = {
    defaultValues: PartDTO;
    onSubmit: (data: PartDTO) => void;
    label: string;
    onDelete?: () => void;
}

export const PartForm = ({ defaultValues, onSubmit, label, onDelete }: PartFormProps) => {
    const { register, handleSubmit, formState: { errors }} = useForm<PartDTO>({ defaultValues });

    const { data: partsData } = useSuspenseQuery(allPartsOptions);

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <Input type="text" label="Name" {...register('name')} required />
                </FormControl>
                <FormControl fullWidth>
                    <Input type="number" label="Price" {...register('price')} required />
                </FormControl>
                <FormControl fullWidth>
                    <Input
                        type="text"
                        label="Part Name Id"
                        {...register('partNameId', {
                            required: "Part Name Id is required",
                            validate: (value) =>
                                validatePartNameIdUniqueness(value, partsData, defaultValues.partNameId),
                        })}
                        error={!!errors.partNameId}
                        helperText={errors.partNameId?.message}
                        required
                        disabled={Boolean(defaultValues?.partNameId)}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <Input type="text" label="CategoryId" {...register('categoryId')} disabled />
                </FormControl>
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