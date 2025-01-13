import { createFileRoute } from '@tanstack/react-router';
import { categoryOptions } from "../../queries/category.ts";
import { EditCategory } from "../../components/Category/EditCategory.tsx";

export const Route = createFileRoute('/category/$identifier/edit')({
    component: EditCategory,
    loader: async ({ context, params }) => {
        const { queryClient } = context;
        const { identifier } = params;
        try {
            return await queryClient.ensureQueryData(categoryOptions(identifier));
        } catch (error) {
            throw new Error(`Failed to load category for identifier "${identifier}"`);
        }
    },
});
