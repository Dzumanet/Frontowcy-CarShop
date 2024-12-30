import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const categoryOptions = (identifier: string) => queryOptions({
    queryKey: ['category', identifier],
    queryFn: async () => {
        return apiCall<Category>(`categories?identifier=${identifier}`);
    },
    staleTime: 1000 * 60,
})

