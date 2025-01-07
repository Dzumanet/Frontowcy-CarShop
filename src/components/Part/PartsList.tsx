import { useNavigate } from "@tanstack/react-router";
import { Box, Button, List, ListItemButton, ListItemText, Tooltip } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { partsOptions } from "../../queries/parts.ts";

type PartsListProps = {
    identifier: string;
    categoryId: string;
}

export const PartsList = ({ categoryId, identifier }: PartsListProps) => {
    const { data: partsData } = useSuspenseQuery(partsOptions(categoryId));
    const navigate = useNavigate();


    const handleEdit = (identifier: string, partNameId: string) => {
        navigate({
            to: `/category/$identifier/part/$partNameId/edit`, params: {
                identifier, partNameId
            }
        });
    };

    const handleAdd = (identifier: string) => {
        navigate({
            to: `/category/$identifier/part/add`, params: {
                identifier
            }
        });
    };

    return (
        <Box>
            <h2>Parts list</h2>
            <List component="nav">
                {partsData.map(part => (
                    <ListItemButton key={part.id} onClick={() => handleEdit(identifier, part.partNameId)}>
                        <Tooltip title="Click to edit or delete" placement="bottom-start">
                            <ListItemText primary={part.name} />

                        </Tooltip>
                    </ListItemButton>
                ))}
            </List>

            <Button variant="outlined" size="small"
                    onClick={() => handleAdd(identifier)}>Add part</Button>


        </Box>
    );
};