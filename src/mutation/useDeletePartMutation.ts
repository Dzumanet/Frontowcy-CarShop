import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Part } from "../types";

export const useDeletePartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['delete-part'],
        mutationFn: async (id: string) => apiCall<Part>(`parts/${id}`, {
            method: 'DELETE',
        }),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.removeQueries({ queryKey: ['parts', id] });
        }
    });
};