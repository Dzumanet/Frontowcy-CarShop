import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Order } from "../types";

export const ordersOptions = queryOptions({
    queryKey: ['orders'],
    queryFn: async () => {
        return apiCall<Order[]>('orders');
    },
    staleTime: 1000 * 60,
})