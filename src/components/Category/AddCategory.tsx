import { useNavigate } from '@tanstack/react-router';

import { useState } from 'react';
import { CategoryForm } from "./CategoryForm.tsx";
import { CategoryDTO } from "../../types";
import { useCreateCategoryMutation } from "../../mutation/useCreateCategoryMutation.ts";
import { Modal } from "../../ui/Modal.tsx";

export const AddCategory = () => {
    const navigate = useNavigate();
    const { mutate } = useCreateCategoryMutation();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate({ to: '/category' });
    };

    const onSubmit = (data: CategoryDTO) => {
        mutate(data, {
            onSuccess: () => {
                navigate({ to: '/category' });
            },
        });
    };

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
                    position: 0,
                }}
                onSubmit={onSubmit}
                label="Add Category"
            />
        </Modal>

    );
};
