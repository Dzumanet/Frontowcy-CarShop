import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Category } from "../types";

export const categoryOptions = (identifier: string) => queryOptions({
    queryKey: ['category', identifier],
    queryFn: async () => {
        const response = await apiCall<Category[]>(`categories?identifier=${identifier}`);
        if (!response.length) {
            throw new Error(`No part found for partNameId "${identifier}"`);
        }
        return response[0];
    },
    staleTime: 1000 * 60,
})

