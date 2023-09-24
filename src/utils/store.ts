import { ActionTypes, CartType } from "@/types/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
};

export const useCartStore = create(persist<CartType & ActionTypes>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart(item) {

        const products = get().products;
        const productInState = products.find(product => product.id === item.id);

        if (productInState) {
            const updatedProducst = products.map((product) =>
                product.id === productInState.id
                    ? {
                        ...item,
                        quantity: item.quantity + product.quantity,
                        price: item.price + product.price,
                    }
                    : item
            );
            set((state) => ({
                products: updatedProducst,
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price
            }));
        }
        else {
            set((state) => ({
                products: [...state.products, item],
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price,
            }));
        }
    },
    removeFromCart(item) {
        set((state) => ({
            products: state.products.filter((product) => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
        }));
    },
}),
    {
        // To be able to persist we are going to store this in our localStorage as cart
        // We have to skipHydration because "persist" use localStorage which is a server-side comp feature. But we are using client comp to be able to use ref and this funcs. We should use "rehydrate" in the components we use useCartStore
        name: "cart", skipHydration: true
    }
));