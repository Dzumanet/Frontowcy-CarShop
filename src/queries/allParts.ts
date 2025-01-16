import { queryOptions } from "@tanstack/react-query";
import { apiCall } from "../utils/apiCall.ts";
import { Part } from "../types";

export const allPartsOptions = queryOptions({
    queryKey: ['parts'],
    queryFn: async () => {
        try {
            return await apiCall<Part[]>('parts');
        } catch (error) {
            console.error('Error fetching parts:', error);
            throw new Error('Failed to fetch parts!');
        }
    }
})