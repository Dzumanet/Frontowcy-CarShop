import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const categoryOptions = (identifier: string) => queryOptions({
    queryKey: ['category', identifier],
    queryFn: async () => {
        try {
            const response = await apiCall<Category[]>(`categories?identifier=${identifier}`);
            if (!response.length) {
                throw new Error(`No category found for identifier: "${identifier}"`);
            }
            return response[0];
        } catch {
            throw new Error(`Failed to fetch category for identifier "${identifier}"`);
        }
    },
    staleTime: 1000 * 60,
});

