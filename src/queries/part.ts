import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Part } from "../types";

export const partOptions = (partNameId: string) => queryOptions({
    queryKey: ['parts', partNameId],
    queryFn: async () => {
        const response = await apiCall<Part[]>(`parts?partNameId=${partNameId}`);
        if (!response.length) {
            throw new Error(`No part found for partNameId "${partNameId}"`);
        }
        return response[0];
    },
    staleTime: 1000 * 60,
})
