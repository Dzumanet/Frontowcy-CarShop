import { createFileRoute } from '@tanstack/react-router'
import { Creator } from "../../pages/Creator.tsx";
import { categoriesOptions } from "../../queries/categories.ts";

export const Route = createFileRoute('/creator/')({
  component: Creator,
  loader: ({ context }) => {
    const { queryClient } = context;
    return queryClient.ensureQueryData(categoriesOptions);
  }
})


