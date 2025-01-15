import { PartDTO } from "../../types";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
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
    const { register, handleSubmit, formState: { errors } } = useForm<PartDTO>({ defaultValues });

    const { data: partsData } = useSuspenseQuery(allPartsOptions);

    return (

        <Box component="form" onSubmit={handleSubmit(onSubmit)}
             sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
                fullWidth
            />
            <TextField
                label="Price"
                type="number"
                {...register('price', { required: 'Price is required' })}
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
            />
            <TextField
                label="Part Name Id"
                {...register('partNameId', {
                    required: 'Part Name Id is required',
                    validate: (value) =>
                        validatePartNameIdUniqueness(value, partsData, defaultValues.partNameId),
                })}
                error={!!errors.partNameId}
                helperText={errors.partNameId?.message}
                fullWidth
                disabled={Boolean(defaultValues?.partNameId)}
            />
            <TextField
                label="CategoryId"
                {...register('categoryId')}
                fullWidth
                disabled
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
                {onDelete && (
                    <Button
                        type="button"
                        variant="outlined"
                        color="error"
                        onClick={onDelete}
                        sx={{ minWidth: 100 }}
                    >
                        Delete
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ minWidth: 100 }}
                >
                    {label}
                </Button>
            </Box>
        </Box>
    );
};