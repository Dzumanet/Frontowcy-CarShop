import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryOptions } from "../../queries/category.ts";
import { Route } from "../../routes/category/$identifier.tsx";
import { partsOptions } from "../../queries/parts.ts";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const CategoryItem = () => {
    const { identifier } = Route.useParams();

    const { data: categoryData } = useSuspenseQuery(categoryOptions(identifier));

    const categoryId = categoryData.id;

    const { data: partsData } = useSuspenseQuery(partsOptions(categoryId));

    const [showEdit, setShowEdit] = useState(false);

    const toggleEdit = () => setShowEdit(prev => !prev);


    return (
        <>
            <div>
                <h2>Category name: {categoryData.identifier}</h2>
                <h3>Category position in creator: {categoryData.position}</h3>
                <button onClick={() => toggleEdit()}>Edit parts</button>
                <button>Edit category</button>

            </div>
            <ul>
                {partsData.map(part => (
                    <li key={part.id}>{part.name}
                        {showEdit ? <>
                            <button>Edit</button>
                            <button>Delete</button>
                        </> : null}
                    </li>
                ))}
            </ul>
            {showEdit ? <button>Add new part</button> : null}

            <Outlet />
        </>
    );
};