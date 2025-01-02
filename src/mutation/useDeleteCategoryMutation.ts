import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-category'],
        mutationFn: async(id: string) => apiCall<Category>(`categories/${id}`, {
            method: 'DELETE',
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
};