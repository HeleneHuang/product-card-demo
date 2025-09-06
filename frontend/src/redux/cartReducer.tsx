import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    size: string;
    img: string;
}

interface CartState {
    products: CartItem[];
}

const initialState: CartState = {
    products: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload
            const existing = state.products.find(
                (item) => item.id === newItem.id && item.size === newItem.size
            )
            if (existing) {
                existing.quantity += newItem.quantity;
            } else {
                state.products.push(newItem);
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(item => item.id !== action.payload);
        },
        resetCart: (state) => {
            state.products = [];
        },
    },
});

export const { addToCart, removeItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;