import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const useDeleteOrderMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-order'],
        mutationFn: async(id: string) => apiCall<Category>(`orders/${id}`, {
            method: 'DELETE',
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    })
};