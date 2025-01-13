import { createFileRoute } from '@tanstack/react-router';
import { CreatorCategory } from "../../pages/CreatorCategory.tsx";
import { categoryOptions } from "../../queries/category.ts";

export const Route = createFileRoute('/creator/$identifier')({
    component: CreatorCategory,
    loader: async ({ params, context }) => {
        const { identifier } = params;
        const { queryClient } = context;

        try {
            return await queryClient.ensureQueryData(categoryOptions(identifier));
        } catch (error) {
            throw new Error(`Could not load category "${identifier}"`);
        }
    }
});
