import { useCreatorStore } from "../store/useCreatorStore.ts";
import { Container } from "@mui/material";

export const OrderValue = () => {
    const {order} = useCreatorStore()

    return (
        <Container>
            <h2>Total price for order: {order.totalPrice}</h2>
        </Container>
    )
};