import { useNavigate } from '@tanstack/react-router';
import { Box, Button, Card, CardContent, Typography, Tooltip, Stack, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
        <Box
            sx={{
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    maxWidth: 960,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 4,
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Category List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    sx={{
                        paddingX: 3,
                        backgroundColor: '#3f51b5',
                        '&:hover': {
                            backgroundColor: '#303f9f',
                        },
                    }}
                >
                    Add Category
                </Button>
            </Box>
            <Stack
                spacing={3}
                sx={{
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {sortedCategories.map((category) => (
                    <Card
                        key={category.id}
                        sx={{
                            width: '100%',
                            maxWidth: 600,
                            padding: 2,
                            cursor: 'pointer',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                        onClick={() => handleEdit(category.identifier)}
                    >
                        <CardContent>
                            <Tooltip title="Click to edit or delete" placement="bottom">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography variant="h6">
                                        {`${category.name}`}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'gray' }}>
                                        {`Position: ${category.position}`}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </CardContent>
                        <Divider sx={{ marginY: 1 }} />
                    </Card>
                ))}
            </Stack>
        </Box>
    );
};