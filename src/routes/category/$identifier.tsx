import { createFileRoute } from '@tanstack/react-router';
import { CategoryItem } from "../../components/Category/CategoryItem.tsx";
import { categoryOptions } from "../../queries/category.ts";
import { partsOptions } from "../../queries/parts.ts";

export const Route = createFileRoute('/category/$identifier')({
    component: CategoryItem,
    loader: async ({ context, params }) => {
        const { queryClient } = context;
        const { identifier } = params;

        const categoryData = await queryClient.ensureQueryData(categoryOptions(identifier));

        const categoryId = categoryData.id

        if (categoryId) {
            await queryClient.ensureQueryData(partsOptions(categoryId));
        }
    }
});

