import { createFileRoute } from '@tanstack/react-router';
import { CategoryItem } from "../../components/Category/CategoryItem.tsx";
import { categoryOptions } from "../../queries/category.ts";
import { partsOptions } from "../../queries/parts.ts";

export const Route = createFileRoute('/category/$identifier')({
    component: CategoryItem,
    loader: async ({ context, params }) => {
        const { queryClient } = context;
        const { identifier } = params;

        try {
            const categoryData = await queryClient.ensureQueryData(categoryOptions(identifier));

            if (!categoryData || !categoryData.id) {
                throw new Error(`Category not found for identifier "${identifier}"`);
            }

            const categoryId = categoryData.id;

            await queryClient.ensureQueryData(partsOptions(categoryId));

            return { category: categoryData };

        } catch (error) {
            throw new Error(`Could not load data for category "${identifier}"`);
        }
    }
});

