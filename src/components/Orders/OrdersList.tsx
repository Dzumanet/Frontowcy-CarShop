import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersOptions } from "../../queries/orders.ts";
import { Box, Card, CardContent, IconButton, List, ListItem, Tooltip, Typography } from "@mui/material";
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


        <Box
            sx={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: 4,
            }}
        >
            <Typography
                align="center"
                variant="h4"
                gutterBottom
                sx={{
                    marginBottom: 4,
                }}
            >
                Orders List
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 3,
                }}
            >
                {ordersData.map((order) => (
                    <Card
                        key={order.id}
                        variant="outlined"
                        sx={{
                            position: 'relative',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            '&:hover': { boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' },
                            padding: 2,
                        }}
                    >
                        <Tooltip title="Delete this order">
                            <IconButton
                                onClick={() => handleDialogOpen()}
                                edge="end"
                                aria-label="delete"
                                sx={{
                                    position: 'absolute',
                                    top: 15,
                                    right: 15,
                                    color: 'error.main',
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {order.firstName} {order.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Email: {order.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Order Value: {order.value} zł
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Details:
                            </Typography>
                            <List sx={{ paddingLeft: 3, maxWidth: 300 }}>
                                {order.details.split(', ').map((detail, index) => (
                                    <ListItem key={index} sx={{ padding: 0, marginBottom: 0.5 }}>
                                        <Typography variant="body2" color="text.primary">
                                            - {detail}
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                        <ConfirmDialog
                            open={dialogOpen}
                            onClose={handleDialogClose}
                            onConfirm={() => handleDelete(order.id)}
                            title="Confirm Deletion"
                            description="Are you sure you want to delete this order? This action cannot be undone."
                        />
                    </Card>
                ))}
            </Box>

        </Box>


        // <Box
        //     sx={{
        //         maxWidth: '1200px',
        //         margin: '0 auto',
        //         padding: 4,
        //     }}
        // >
        //     <Typography
        //         align="center"
        //         variant="h4"
        //         gutterBottom
        //         sx={{
        //             marginBottom: 4,
        //         }}
        //     >
        //         Orders List
        //     </Typography>
        //     <Box
        //         sx={{
        //             display: 'grid',
        //             gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        //             gap: 3,
        //         }}
        //     >
        //         {ordersData.map((order) => (
        //             <Card
        //                 key={order.id}
        //                 variant="outlined"
        //                 sx={{
        //                     position: 'relative',
        //                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        //                     '&:hover': { boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)' },
        //                 }}
        //             >
        //                 <CardContent>
        //                     <Typography variant="h6" gutterBottom>
        //                         {order.firstName} {order.lastName}
        //                     </Typography>
        //                     <Typography variant="body2" color="text.secondary">
        //                         Email: {order.email}
        //                     </Typography>
        //                     <Typography variant="body2" color="text.secondary">
        //                         Order Value: {order.value} zł
        //                     </Typography>
        //                     <Typography variant="body2" color="text.secondary">
        //                         Details: {order.details}
        //                     </Typography>
        //                 </CardContent>
        //                 <Tooltip title="Delete this order">
        //                     <IconButton
        //                         onClick={() => handleDialogOpen()}
        //                         edge="end"
        //                         aria-label="delete"
        //                         sx={{
        //                             position: 'absolute',
        //                             top: 8,
        //                             right: 8,
        //                             color: 'error.main',
        //                         }}
        //                     >
        //                         <DeleteIcon />
        //                     </IconButton>
        //                 </Tooltip>
        //                 <ConfirmDialog
        //                     open={dialogOpen}
        //                     onClose={handleDialogClose}
        //                     onConfirm={() => handleDelete(order.id)}
        //                     title="Confirm Deletion"
        //                     description="Are you sure you want to delete this order? This action cannot be undone."
        //                 />
        //             </Card>
        //         ))}
        //     </Box>
        // </Box>
    );
};