import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Part } from "../types";

export const partOptions = (partNameId: string) => queryOptions({
    queryKey: ['parts', partNameId],
    queryFn: async () => {
        try {
            const response = await apiCall<Part[]>(`parts?partNameId=${partNameId}`);
            if (!response.length) {
                throw new Error(`No part found for partNameId "${partNameId}"`);
            }
            return response[0];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch part for partNameId "${partNameId}": ${error.message}`);
            }
            throw new Error(`Failed to fetch part for partNameId "${partNameId}": ${String(error)}`);
        }
    },
    staleTime: 1000 * 60,
});
