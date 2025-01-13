import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Order } from "../types";

export const ordersOptions = queryOptions({
    queryKey: ['orders'],
    queryFn: async () => {
        try {
            return await apiCall<Order[]>('orders');
        } catch (error) {
            throw new Error('Failed to fetch orders');
        }
    },
    staleTime: 1000 * 60,
});