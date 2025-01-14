import { PartDTO } from "../types";

export const validatePartNameIdUniqueness = (
    value: string,
    partsData: PartDTO[],
    defaultPartNameId: string
) => {
    const isDuplicate = partsData.some(
        (part) =>
            part.partNameId === value &&
            part.partNameId !== defaultPartNameId
    );
    return isDuplicate ? "Part Name Id must be unique" : true;
};
