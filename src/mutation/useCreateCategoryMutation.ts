import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, CategoryDTO } from "../types";
import { apiCall } from "../utils/apiCall.ts";

export const useCreateCategoryMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['new-category'],
        mutationFn: async (body: CategoryDTO) => apiCall<Category, CategoryDTO>('categories', {
            method: 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
};