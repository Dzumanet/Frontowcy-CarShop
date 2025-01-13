import { useSuspenseQuery } from "@tanstack/react-query";
import { PartDTO } from "../../types";
import { useUpdatePartMutation } from "../../mutation/useUpdatePartMutation.ts";
import { useNavigate } from "@tanstack/react-router";
import { partOptions } from "../../queries/part.ts";
import { PartForm } from "./PartForm.tsx";
import { Modal } from "../../ui/Modal.tsx";
import { useState } from "react";
import { useDeletePartMutation } from "../../mutation/useDeletePartMutation.ts";
import { ConfirmDialog } from "../../ui/ConfirmDialog.tsx";
import { Route } from "../../routes/category/$identifier.part.$partNameId.edit.tsx";
import { CircularProgress } from "../../ui/CircularProgress.tsx";


export const EditPart = () => {
    const { partNameId, identifier } = Route.useParams();
    const { data: partsData } = useSuspenseQuery(partOptions(partNameId));
    const { mutate: deletePart, isPending: isDeleting } = useDeletePartMutation();
    const { mutate: updatePart, isPending: isUpdating } = useUpdatePartMutation(partsData.id);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        deletePart(id, {
            onSuccess: () => {
                setDialogOpen(false);
                setOpen(false);

                navigate({
                    to: "/category/$identifier",
                    params: { identifier },
                });
            },
        });
    };

    const handleClose = () => {
        setOpen(false);
        navigate({
            to: "/category/$identifier", params: {
                identifier
            }
        });
    };

    const onSubmit = (data: PartDTO) => {
        updatePart({ ...data }, {
            onSuccess: () => {
                setOpen(false);
                navigate({
                    to: "/category/$identifier",
                    params: { identifier }
                });
            },
        });
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
            open={open}
            onClose={handleClose}
            label="Edit part">
            <PartForm
                key={partsData.id}
                defaultValues={{
                    name: partsData.name,
                    price: partsData.price,
                    partNameId: partsData.partNameId,
                    categoryId: partsData.categoryId
                }}
                onSubmit={onSubmit} label="Save"
                onDelete={handleDialogOpen}
            />
            <ConfirmDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onConfirm={() => handleDelete(partsData.id)}
                title="Confirm Deletion"
                description="Are you sure you want to delete this part? This action cannot be undone."
            />
        </Modal>
    );
};