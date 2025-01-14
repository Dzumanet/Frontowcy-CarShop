import { CategoryForm } from "./CategoryForm.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryOptions } from "../../queries/category.ts";
import { CategoryDTO } from "../../types";
import { useNavigate } from "@tanstack/react-router";
import { Route } from "../../routes/category/$identifier.edit.tsx";
import { useUpdateCategoryMutation } from "../../mutation/useUpdateCategoryMutation.ts";
import { useDeleteCategoryMutation } from "../../mutation/useDeleteCategoryMutation.ts";
import { Modal } from "../../ui/Modal.tsx";
import { useState } from "react";
import { ConfirmDialog } from "../../ui/ConfirmDialog.tsx";
import { CircularProgress } from "../../ui/CircularProgress.tsx";

export const EditCategory = () => {
    const { identifier } = Route.useParams();
    const { data: categoryData } = useSuspenseQuery(categoryOptions(identifier));
    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategoryMutation();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategoryMutation(categoryData.id);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        deleteCategory(id, {
            onSuccess: () => {
                setDialogOpen(false);
                setOpen(false);
                navigate({ to: '/category' });
            },
        });
    };

    const onSubmit = (data: CategoryDTO) => {
        updateCategory({
                ...data,
                position: Number(data.position)
            },
            {
                onSuccess: () => {
                    setOpen(false);
                    navigate({ to: `/category/${identifier}` });
                }
            });
    };

    const handleClose = () => {
        setOpen(false);
        navigate({ to: `/category/${identifier}` });
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    if (isDeleting || isUpdating) {
        return <CircularProgress />;
    }

    return (
        <Modal
            label="Edit category"
            open={open}
            onClose={handleClose}
        >
            <CategoryForm defaultValues={{
                name: categoryData.name,
                identifier: categoryData.identifier,
                position: categoryData.position
            }}
                          onSubmit={onSubmit} label="Save"
                          onDelete={handleDialogOpen}
                          isEdit={true}
            />
            <ConfirmDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={() => handleDelete(categoryData.id)}
                title="Confirm Deletion"
                description="Are you sure you want to delete this category? This action cannot be undone."
            />
        </Modal>
    );
};