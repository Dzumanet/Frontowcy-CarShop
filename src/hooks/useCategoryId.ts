import { categoryOptions } from "../queries/category.ts";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useCategoryId = (identifier: string) => {
    const { data } = useSuspenseQuery(categoryOptions(identifier));

      return { categoryId: data.id ?? null }

};