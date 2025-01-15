import { useNavigate } from "@tanstack/react-router";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { partsOptions } from "../../queries/parts.ts";
import AddIcon from '@mui/icons-material/Add';

type PartsListProps = {
    identifier: string;
    categoryId: string;
}

export const PartsList = ({ categoryId, identifier }: PartsListProps) => {
    const { data: partsData } = useSuspenseQuery(partsOptions(categoryId));
    const navigate = useNavigate();

    const handleNavigate = (path: string, params: Record<string, string>) => {
        navigate({ to: path, params });
    };

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginBottom: 3,
                }}
            >
                <Typography variant="h4">Parts list</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => handleNavigate(`/category/$identifier/part/add`, { identifier })}
                >
                    Add part
                </Button>
            </Box>
            <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                {partsData.map((part) => (
                    <Card
                        key={part.id}
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            cursor: 'pointer',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': { transform: 'scale(1.02)', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' },
                        }}
                        onClick={() =>
                            handleNavigate(`/category/$identifier/part/$partNameId/edit`, {
                                identifier,
                                partNameId: part.partNameId,
                            })
                        }
                    >
                        <CardContent>
                            <Tooltip title="Click to edit or delete" placement="bottom">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 1,
                                        marginTop: 1,
                                    }}
                                >
                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                        {part.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                        Price: {part.price}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};