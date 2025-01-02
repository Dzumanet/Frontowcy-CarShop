import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const useDeletePartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-part'],
        mutationFn: async(id: string) => apiCall<Category>(`parts/${id}`, {
            method: 'DELETE',
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['parts']
            })
        }
    })
};