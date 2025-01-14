import { CategoryDTO } from "../../types";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input.tsx";
import { Button, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ButtonWrapper } from "../../ui/ButtonWrapper.tsx";
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
        formState: { errors },
    } = useForm<CategoryDTO>({ defaultValues });
    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);

    const { allPositions, firstAvailablePosition, usedPositions } = getAvailablePositions(categoriesData);

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth>
                    <Input type="text" label="Name"
                           {...register('name')} required />
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <Input
                        type="text"
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="position">Position</InputLabel>
                    <Select
                        autoWidth
                        {...register('position')}
                        id="position"
                        defaultValue={defaultValues?.position || firstAvailablePosition}
                        required>
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