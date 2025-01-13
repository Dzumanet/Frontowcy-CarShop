import { useNavigate } from '@tanstack/react-router';
import { Button, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { categoriesOptions } from "../../queries/categories.ts";
import { CircularProgress } from "../../ui/CircularProgress.tsx";
import { Suspense } from "react";

export const CategoryList = () => {
    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);
    const navigate = useNavigate();

    const handleOpen = () => {
        navigate({ to: '/category/add' });
    };

    const handleEdit = (identifier: string) => {
        navigate({
            to: `/category/$identifier`, params: {
                identifier
            }
        });
    };

    return (
        <Suspense fallback={<CircularProgress />}>
            <h2>Category List</h2>
            <Button variant="outlined" size="small" onClick={handleOpen}>Add Category</Button>
            <List component="nav">
                {categoriesData.map((category) => (
                    <ListItemButton key={category.id} onClick={() => handleEdit(category.identifier)}>
                        <Tooltip title="Click to edit or delete" placement="bottom-start">
                            <ListItemText primary={category.name} />
                        </Tooltip>
                    </ListItemButton>
                ))}
            </List>
        </Suspense>
    );
};