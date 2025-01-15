import { CategoryDTO } from "../../types";
import { useForm } from "react-hook-form";
import { Button, FormControl, InputLabel, Select, MenuItem, Box, TextField } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesOptions } from "../../queries/categories.ts";
import { getAvailablePositions } from "../../utils/getAvailablePositions.ts";
import { validateIdentifierUniqueness } from "../../utils/validateIdentifierUniqueness.ts";

type CategoryFormProps = {
    defaultValues: CategoryDTO;
    onSubmit: (data: CategoryDTO) => void;
    label: string;
    onDelete?: () => void;
    isEdit: boolean;
}

export const CategoryForm = ({ defaultValues, onSubmit, label, onDelete, isEdit = false }: CategoryFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CategoryDTO>({ defaultValues });
    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);

    const { allPositions, firstAvailablePosition, usedPositions } = getAvailablePositions(categoriesData);

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth>
                <TextField
                    label="Name"
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    label="Identifier"
                    {...register("identifier", {
                        required: "Identifier is required",
                        validate: (value) =>
                            validateIdentifierUniqueness(value, categoriesData, defaultValues.identifier),
                    })}
                    error={!!errors.identifier}
                    helperText={errors.identifier?.message}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="position">Position</InputLabel>
                <Select
                    labelId="position"
                    label="Position"
                    {...register('position')}
                    defaultValue={defaultValues?.position || firstAvailablePosition}
                >
                    {allPositions.map(pos => (
                        <MenuItem
                            key={pos}
                            value={pos}
                            disabled={usedPositions.has(pos) && pos !== defaultValues.position}
                        >
                            {pos}
                            {isEdit && pos === defaultValues.position && ' (Current position)'}
                            {usedPositions.has(pos) && pos !== defaultValues.position ? ' (Assigned)' : ''}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 2 }}>
                {onDelete && (
                    <Button variant="outlined" color="error" onClick={onDelete}>
                        Delete
                    </Button>
                )}
                <Button variant="contained" color="primary" type="submit">
                    {label}
                </Button>
            </Box>
        </Box>
    );
};