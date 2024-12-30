import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const categoriesOptions = queryOptions({
    queryKey: ['category'],
    queryFn: async () => {
        return apiCall<Category[]>('categories');
    },
    staleTime: 1000 * 60,
})