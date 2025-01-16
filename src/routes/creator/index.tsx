import { createFileRoute } from '@tanstack/react-router';
import { Creator } from "../../pages/Creator.tsx";
import { categoriesOptions } from "../../queries/categories.ts";

export const Route = createFileRoute('/creator/')({
    component: Creator,
    loader: async ({ context }) => {
        const { queryClient } = context;

        try {
            return await queryClient.ensureQueryData(categoriesOptions);
        } catch {
            throw new Error('Could not load categories.');
        }
    }
});


