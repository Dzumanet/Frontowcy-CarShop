export type Category = {
    id: string;
    name: string;
    identifier: string;
    position: number;
}

export type CategoryDTO = Omit<Category, 'id'>;

export type CategoryWithParts =Category & {
    parts: Part[];
}

export type Part = {
    id: string;
    name: string;
    price: number;
    partNameId: string;
    categoryId: string
    categoryIdentifier?: string;
}

export type PartDTO = Omit<Part, 'id'>;

export type Order = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    value: number;
    details: string;
}

export type OrderDTO = Omit<Order, 'id'>;
