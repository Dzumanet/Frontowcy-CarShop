
import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { CategoryWithParts } from "../types";

export const categoryWithPartsOptions = (id: string) => queryOptions({
    queryKey: ['category', id],
    queryFn: async () => {
        return apiCall<CategoryWithParts>(`categories/${id}?_embed=parts`);
    },
    staleTime: 1000 * 60,
})