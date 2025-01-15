import { useCreatorStore } from "../store/useCreatorStore.ts";
import { Typography } from "@mui/material";

export const OrderValue = () => {
    const {order} = useCreatorStore()

    return (
        <Typography variant="h5" color="primary" align="center" sx={{ marginBottom: 2 }}>
            Total price for order: {order.totalPrice} zł
        </Typography>
    )
};