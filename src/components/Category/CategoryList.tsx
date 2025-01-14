import { useNavigate } from '@tanstack/react-router';
import { Button, List, ListItemButton, ListItemText, Tooltip } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import { categoriesOptions } from "../../queries/categories.ts";


export const CategoryList = () => {
    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);
    const navigate = useNavigate();

    const sortedCategories = categoriesData.sort((a, b) => a.position - b.position);

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
        <div>
            <h2>Category List</h2>
            <Button variant="outlined" size="small" onClick={handleOpen}>Add Category</Button>
            <List component="nav">
                {sortedCategories.map((category) => (
                    <ListItemButton key={category.id} onClick={() => handleEdit(category.identifier)}>
                        <Tooltip title="Click to edit or delete" placement="bottom-start">
                            <ListItemText primary={`${category.position} - ${category.name}`} />
                        </Tooltip>
                    </ListItemButton>
                ))}
            </List>
        </div>
    );
};