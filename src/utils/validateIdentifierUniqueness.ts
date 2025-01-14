import { CategoryDTO } from "../types";

export const validateIdentifierUniqueness = (
    value: string,
    categoriesData: CategoryDTO[],
    defaultIdentifier: string
) => {
    const isDuplicate = categoriesData.some(
        (category) =>
            category.identifier === value &&
            category.identifier !== defaultIdentifier
    );
    return isDuplicate ? "Identifier must be unique" : true;
};