import { createFileRoute } from '@tanstack/react-router';
import { OrdersList } from "../../components/Orders/OrdersList.tsx";
import { ordersOptions } from "../../queries/orders.ts";

export const Route = createFileRoute('/orders/')({
    component: OrdersList,
    loader: async ({ context }) => {
        const { queryClient } = context;
        try {
            return await queryClient.ensureQueryData(ordersOptions);
        } catch {
            throw new Error('Could not load orders.');
        }
    }
});