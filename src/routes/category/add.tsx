import { createFileRoute } from '@tanstack/react-router'
import { AddCategory } from "../../components/Category/AddCategory.tsx";

export const Route = createFileRoute('/category/add')({
  component: AddCategory,
})

