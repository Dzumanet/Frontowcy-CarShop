import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const categoriesOptions = queryOptions({
    queryKey: ['category'],
    queryFn: async () => {
        try {
            return await apiCall<Category[]>('categories');
        } catch (error) {
            throw new Error('Failed to fetch categories!');
        }
    },
    staleTime: 1000 * 60,
})