import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Part } from "../types";

type CreatorState = {
    order: {
        selectedParts: Part[];
        totalPrice: number;
    },
    clientInfo: {
        clientName: string;
        clientEmail: string;
    },

};

type CreatorActions = {
    setOrderData: (payload: SetOrderDataAction) => void;
    removePart: (partId: string) => void;
    resetConfiguration: () => void;
    setClientInfo: (payload: SetClientInfoAction) => void;
};

type SetOrderDataAction = {
    selectedParts: Part[];
    totalPrice: number;
};

type SetClientInfoAction = {
    clientName: string;
    clientEmail: string;
}

const initialState: CreatorState = {
    order: {
        selectedParts: [],
        totalPrice: 0,
    },
    clientInfo: {
        clientName: '',
        clientEmail: '',
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
            setClientInfo: (payload: SetClientInfoAction) =>
                set({
                    clientInfo: payload,
                }),
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
                    clientInfo: initialState.clientInfo,
                }),
        }),
        {
            name: 'creator-storage',
            version: 1,
        }
    )
);
