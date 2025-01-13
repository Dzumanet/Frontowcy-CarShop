import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { categoriesOptions } from "../queries/categories.ts";

export const Creator = () => {
    const router = useRouter();

    const { data: categoriesData } = useSuspenseQuery(categoriesOptions);

    useEffect(() => {
        if (categoriesData) {
            const firstCategory = categoriesData.sort((a, b) => a.position - b.position)[0];
            if (firstCategory) {
                router.navigate({ to: `/creator/${firstCategory.identifier}` });
            }
        }
    }, [categoriesData, router]);

    if (!categoriesData?.length) {
        return <p>No categories available. Please try again later.</p>;
    }
    return null
};