import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryOptions } from "../queries/category.ts";

export const useCheckIdentifier = (identifier: string) => {
    const { data } = useSuspenseQuery(categoryOptions(identifier));

    const isIdentifierUnique = !data;

    return isIdentifierUnique;

};