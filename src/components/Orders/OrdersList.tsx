import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersOptions } from "../../queries/orders.ts";
import { Box, Card, CardContent, Container, IconButton, Typography } from "@mui/material";
import { useDeleteOrderMutation } from "../../mutation/useDeleteOrderMutation.ts";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { ConfirmDialog } from "../../ui/ConfirmDialog.tsx";
import { useState } from "react";
import { CircularProgress } from "../../ui/CircularProgress.tsx";

export const OrdersList = () => {
    const { data: ordersData } = useSuspenseQuery(ordersOptions);
    const { mutate: deleteOrder, isPending } = useDeleteOrderMutation();
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleDelete = (id: string) => {
        deleteOrder(id, {
            onSuccess: () => {
                setDialogOpen(false);
            }
        });
    };

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    if (isPending) return <CircularProgress />;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Lista zamówień
            </Typography>
            <Container>
                {ordersData.map((order) => (
                    <Container key={order.id}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6">
                                    {order.firstName} {order.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Email: {order.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Wartość zamówienia: {order.value} zł
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Szczegóły: {order.details}
                                </Typography>
                                <IconButton
                                    onClick={() => handleDialogOpen()}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </CardContent>
                        </Card>
                        <ConfirmDialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            onConfirm={() => handleDelete(order.id)}
                            title="Confirm Deletion"
                            description="Are you sure you want to delete this order? This action cannot be undone."
                        />
                    </Container>
                ))}
            </Container>
        </Box>
    );
};