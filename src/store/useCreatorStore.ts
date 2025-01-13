import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Part } from "../types";

type CreatorState = {
    order: {
        selectedParts: Part[];
        totalPrice: number;
    }
};

type CreatorActions = {
    setOrderData: (payload: SetOrderDataAction) => void;
    removePart: (partId: string) => void;
    resetConfiguration: () => void;
};

type SetOrderDataAction = {
    selectedParts: Part[];
    totalPrice: number;
};

const initialState: CreatorState = {
    order: {
        selectedParts: [],
        totalPrice: 0,
    }
};

export const useCreatorStore = create<CreatorState & CreatorActions>()(
    persist(
        (set) => ({
            ...initialState,
            setOrderData: (payload: SetOrderDataAction) =>
                set(() => ({
                    order: {
                        selectedParts: payload.selectedParts.map((part) => ({
                            ...part,
                            categoryIdentifier: part.categoryIdentifier || '',
                        })),
                        totalPrice: payload.totalPrice,
                    },
                })),
            removePart: (partId: string) =>
                set((state) => {
                    const partToRemove = state.order.selectedParts.find(
                        (part) => part.id === partId
                    );

                    if (!partToRemove) return state;

                    return {
                        order: {
                            selectedParts: state.order.selectedParts.filter(
                                (part) => part.id !== partId
                            ),
                            totalPrice: state.order.totalPrice - partToRemove.price,
                        },
                    };
                }),
            resetConfiguration: () =>
                set({
                    order: initialState.order,
                }),
        }),
        {
            name: 'creator-storage',
            version: 1,
        }
    )
);
