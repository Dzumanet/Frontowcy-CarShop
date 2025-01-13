import { createFileRoute } from '@tanstack/react-router';
import { CategoryList } from "../../components/Category/CategoryList.tsx";
import { categoriesOptions } from "../../queries/categories.ts";

export const Route = createFileRoute('/category/')({
    component: CategoryList,
    loader: async ({ context }) => {
        const { queryClient } = context;
        try {
            return await queryClient.ensureQueryData(categoriesOptions);
        } catch (error) {
            throw new Error('Could not load categories.');
        }
    }
});
