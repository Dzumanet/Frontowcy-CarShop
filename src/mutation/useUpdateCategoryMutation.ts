import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category, CategoryDTO } from "../types";
import { apiCall } from "../utils/apiCall.ts";

export const useUpdateCategoryMutation = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['update-category', id],
        mutationFn: async (body: CategoryDTO) => apiCall<Category, CategoryDTO>(`categories/${id}`, {
            method: 'PUT',
            body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['category']
            })
        }
    })
};