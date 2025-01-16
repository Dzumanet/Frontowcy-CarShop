import { createFileRoute } from '@tanstack/react-router';
import { AddPart } from "../../components/Part/AddPart.tsx";
import { categoryOptions } from "../../queries/category.ts";

export const Route = createFileRoute('/category/$identifier/part/add')({
    component: AddPart,
    loader: async ({ context, params }) => {
        const { queryClient } = context;
        const { identifier } = params;
        try {
            return queryClient.ensureQueryData(categoryOptions(identifier));
        } catch {
            throw new Error(`Could not load category for identifier "${identifier}"`);
        }
    }
});