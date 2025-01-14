import { CategoryDTO } from "../types";

export const getAvailablePositions = (categoriesData: CategoryDTO[] | undefined) => {
    const usedPositions = new Set(categoriesData?.map(cat => Number(cat.position)) || []);
    const maxPosition = Math.max(...Array.from(usedPositions), 0);
    const allPositions = Array.from({ length: maxPosition + 10 }, (_, i) => i + 1).filter(pos => pos !== 0);
    const firstAvailablePosition = allPositions.find(pos => !usedPositions.has(pos)) || allPositions[0];

    return { allPositions, firstAvailablePosition, usedPositions };
};