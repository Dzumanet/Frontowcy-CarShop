import { useNavigate } from '@tanstack/react-router';

import { useState } from 'react';
import { CategoryForm } from "./CategoryForm.tsx";
import { CategoryDTO } from "../../types";
import { useCreateCategoryMutation } from "../../mutation/useCreateCategoryMutation.ts";
import { Modal } from "../../ui/Modal.tsx";
import { CircularProgress } from "../../ui/CircularProgress.tsx";
import { getAvailablePositions } from "../../utils/getAvailablePositions.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoriesOptions } from "../../queries/categories.ts";


export const AddCategory = () => {
    const navigate = useNavigate();
    const { mutate: createCategory, isPending } = useCreateCategoryMutation();
    const [open, setOpen] = useState(true);
    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);

    const { firstAvailablePosition } = getAvailablePositions(categoriesData);

    const handleClose = () => {
        setOpen(false);
        navigate({ to: '/category' });
    };

    const onSubmit = (data: CategoryDTO) => {
        createCategory(
            {
                ...data,
                position: Number(data.position)
            },
            {
                onSuccess: () => {
                    navigate({ to: '/category' });
                },
            });
    };

    if (isPending) return <CircularProgress />;

    return (
        <Modal
            open={open}
            onClose={handleClose}
            label="Add Category"
        >
            <CategoryForm
                defaultValues={{
                    name: '',
                    identifier: '',
                    position: firstAvailablePosition,
                }}
                onSubmit={onSubmit}
                label="Add Category"
                isEdit={false}
            />
        </Modal>
    );
};