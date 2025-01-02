import { createFileRoute } from '@tanstack/react-router';
import { CategoryList } from "../../components/Category/CategoryList.tsx";
import { categoriesOptions } from "../../queries/categories.ts";

export const Route = createFileRoute('/category/')({
    component: CategoryList,
    loader: ({ context }) => {
        const { queryClient } = context;
        return queryClient.ensureQueryData(categoriesOptions);
    }

});
