import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Part, PartDTO } from "../types";
import { apiCall } from "../utils/apiCall.ts";

export const useUpdatePartMutation = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['update-part', id],
        mutationFn: async (body: PartDTO) => apiCall<Part, PartDTO>(`parts/${id}`, {
            method: 'PUT',
            body
        }),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts', id] });
            queryClient.invalidateQueries({ queryKey: ['parts'] });
        }
    })
}