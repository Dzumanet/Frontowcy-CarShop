import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category, Part } from "../types";

export const useDeleteCategoryMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-category'],
        mutationFn: async (id: string) => {
            const parts = await apiCall<Part[]>(`parts?categoryId=${id}`, { method: 'GET' });

            if (parts.length > 0) {
                for (const part of parts) {
                    await apiCall<Part>(`parts/${part.id}`, { method: 'DELETE' });
                }
            }

            return apiCall<Category>(`categories/${id}`, { method: 'DELETE' });

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['category'] });
            queryClient.invalidateQueries({ queryKey: ['parts'] });
        },
    });
};