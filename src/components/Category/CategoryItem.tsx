import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryOptions } from "../../queries/category.ts";
import { PartsList } from "../Part/PartsList.tsx";
import { Route } from "../../routes/category/$identifier.tsx";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


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
        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: 1200, width: '100%' }}>
                <Card
                    sx={{
                        marginBottom: 3,
                        padding: 2,
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: 2,
                        backgroundImage: 'linear-gradient(to bottom right, #f5f7fa, #c3cfe2)',
                        textAlign: 'center',
                    }}
                >
                    <CardContent>
                        <Typography variant="subtitle2" sx={{ color: 'gray', fontWeight: 'bold' }}>
                            Category
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                            {categoryData.name}
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                            Position in creator: {categoryData.position}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={() => handleEditCategory(identifier)}
                            startIcon={<EditIcon />}
                            sx={{
                                marginTop: 3,
                                paddingX: 4,
                                backgroundColor: '#3f51b5',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                },
                            }}
                        >
                            Edit category
                        </Button>
                    </CardContent>
                </Card>
                <PartsList identifier={identifier} categoryId={categoryId} />
                <Outlet />
            </Box>
        </Box>
    );
};