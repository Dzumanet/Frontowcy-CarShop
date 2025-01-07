import { createFileRoute } from '@tanstack/react-router'
import { categoryOptions } from "../../queries/category.ts";
import { EditCategory } from "../../components/Category/EditCategory.tsx";

export const Route = createFileRoute('/category/$identifier/edit')({
  component: EditCategory,
  loader: ({ context, params }) => {
    const { queryClient } = context
    const { identifier } = params
    return queryClient.ensureQueryData(categoryOptions(identifier))
  },
})
