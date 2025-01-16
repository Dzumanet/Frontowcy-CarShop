import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { CategoryWithParts } from "../types";

export const categoryWithPartsOptions = (id: string) => queryOptions({
    queryKey: ['category', id],
    queryFn: async () => {
        try {
            return await apiCall<CategoryWithParts>(`categories/${id}?_embed=parts`);
        } catch {
            throw new Error(`Failed to fetch category with parts for ID "${id}"`);
        }
    },
    staleTime: 1000 * 60,
});