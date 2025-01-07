import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryOptions } from "../../queries/category.ts";
import { Route } from "../../routes/category/$identifier.tsx";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Button } from "@mui/material";
import { PartsList } from "../Part/PartsList.tsx";

export const CategoryItem = () => {
    const { identifier } = Route.useParams();
    const { data: categoryData } = useSuspenseQuery(categoryOptions(identifier));
    const categoryId = categoryData.id;
    const navigate = useNavigate();

    const handleEditCategory = (identifier: string) => {
        navigate({
            to: `/category/$identifier/edit`, params: {
                identifier
            }
        });
    };

    return (
        <>
            <div>
                <h2>Category name: {categoryData.name}</h2>
                <h3>Category position in creator: {categoryData.position}</h3>

                <Button variant="outlined" size="small"
                        onClick={() => handleEditCategory(identifier)}>Edit category</Button>
            </div>

            <PartsList identifier={identifier} categoryId={categoryId} />
            <Outlet />
        </>
    );
};