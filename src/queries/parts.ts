import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Part } from "../types";

export const partsOptions = (categoryId: string) => queryOptions({
    queryKey: ['parts', categoryId],
    queryFn: async () => {
        return apiCall<Part[]>(`parts?categoryId=${categoryId}`);
    },
    staleTime: 1000 * 60,
})
