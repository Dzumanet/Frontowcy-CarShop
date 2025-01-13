import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderDTO } from "../types";
import { apiCall } from "../utils/apiCall.ts";

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['new-order'],
        mutationFn: async (body: OrderDTO) => apiCall<Order, OrderDTO>('orders', {
            method: 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['orders']
            })
        }
    })
};