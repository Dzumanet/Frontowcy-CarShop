import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Part, PartDTO } from "../types";
import { apiCall } from "../utils/apiCall.ts";


export const useCreatePartMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['new-part'],
        mutationFn: async (body: PartDTO) => apiCall<Part, PartDTO>('parts', {
            method: 'POST',
            body
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['parts']
            })
        }
    })
};