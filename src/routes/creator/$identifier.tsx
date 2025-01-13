import { createFileRoute } from '@tanstack/react-router';
import { CreatorCategory } from "../../pages/CreatorCategory.tsx";
import { categoryOptions } from "../../queries/category.ts";

export const Route = createFileRoute('/creator/$identifier')({
    component: CreatorCategory,
    loader: ({ params, context }) => {
        const { identifier } = params;
        const { queryClient } = context;


        return queryClient.ensureQueryData(categoryOptions(identifier));
    }
});
