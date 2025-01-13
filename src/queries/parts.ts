import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Part } from "../types";

export const partsOptions = (categoryId: string) => queryOptions({
    queryKey: ['parts', categoryId],
    queryFn: async () => {
        try {
            return await apiCall<Part[]>(`parts?categoryId=${categoryId}`);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch parts for categoryId "${categoryId}": ${error.message}`);
            }
            throw new Error(`Failed to fetch parts for categoryId "${categoryId}": ${String(error)}`);
        }
    },
    staleTime: 1000 * 60,
});
