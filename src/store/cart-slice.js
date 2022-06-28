import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;

            const existingItem = state.cartItems.find(i => i.id === item.id);

            state.changed = true;

            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += existingItem.price;
            } else {
                state.cartItems.push({
                    id: item.id,
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price,
                    name: item.title,
                });
            }

            state.totalQuantity += 1;
        },
        removeItem: (state, action) => {
            const id = action.payload;

            const item = state.cartItems.find(i => i.id === id);

            state.changed = true;

            if (item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = item.price * item.quantity;
            } else {
                state.cartItems = state.cartItems.filter(i => i.id !== id);
            }

            state.totalQuantity -= 1;

        },
        replaceCart: (state, action) => {
            state.totalQuantity = action.payload.totalQuantity;
            state.cartItems = action.payload.cartItems;
        } 
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;
