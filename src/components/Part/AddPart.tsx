import { PartForm } from "./PartForm.tsx";
import { PartDTO } from "../../types";
import { useCreatePartMutation } from "../../mutation/useCreatePartMutation.ts";
import { Route } from "../../routes/category/$identifier.part.add.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryOptions } from "../../queries/category.ts";
import { useNavigate } from "@tanstack/react-router";
import { Modal } from "../../ui/Modal.tsx";
import { useState } from "react";

export const AddPart = () => {
    const { identifier } = Route.useParams();

    const { data: categoryData } = useSuspenseQuery(categoryOptions(identifier));
    const { mutate } = useCreatePartMutation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);

    const categoryId = categoryData.id;

    const onSubmit = (data: PartDTO) => {
        mutate(data, {
            onSuccess: () => {
                navigate({
                    to: "/category/$identifier", params: {
                        identifier
                    }
                });
            }
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

    return (
        <Modal
            open={open}
            onClose={handleClose}
            label={`Add part to ${categoryData.name}`}
        >
            <PartForm defaultValues={{
                name: '',
                price: 0,
                partNameId: '',
                categoryId
            }} onSubmit={onSubmit} label="Save" />
        </Modal>
    )
        ;
};
