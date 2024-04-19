// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "..";
// import { stat } from "fs";
// import { Order } from "@/app/cart/page";
// import { Product } from "../../ProductList";
// import { useMemo } from "react";
// import toast from "react-hot-toast";

// interface CartState {
//   cart: Order[];
// }

// const initialState: CartState = {
//   cart: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart(
//       state,
//       action: PayloadAction<{ product: Product;  }>
//     ) {
//       const existingProduct = state.cart.find(
//         (order: Order) => order.variant.id === action.payload.variant.id
//       );

//       if (
//         existingProduct &&
//         existingProduct.count >= (existingProduct.variant.quantity || Infinity)
//       ) {
//         toast.error(
//           `max available quantity is ${existingProduct.variant.quantity}`
//         );
//         return;
//       }
//       if (existingProduct) {
//         existingProduct.count = Math.max(existingProduct.count + 1, 1);
//       } else {
//         state.cart.push({
//           product: action.payload.product,
//           variant: action.payload.variant,
//           count: 1,
//         });
//       }
//     },
//     setProductCount(
//       state,
//       action: PayloadAction<{
//         product: Product;
//         variant: ProductVariant;
//         count: number;
//       }>
//     ) {
//       const existingProduct = state.cart.find(
//         (order: Order) => order.variant.id === action.payload.variant.id
//       );
//       if (
//         existingProduct &&
//         action.payload.count > (existingProduct.variant.quantity || Infinity)
//       ) {
//         toast.error(
//           `max available quantity is ${existingProduct.variant.quantity}`
//         );
//         return;
//       }
//       if (existingProduct) {
//         existingProduct.count = action.payload.count;
//       } else {
//         state.cart.push({
//           product: action.payload.product,
//           variant: action.payload.variant,
//           count: action.payload.count,
//         });
//       }
//     },
//     removeFromCart(state, action: PayloadAction<ProductVariant>) {
//       const existingProduct = state.cart.find(
//         (order) => order.variant.id === action.payload.id
//       );

//       if (existingProduct) {
//         if (existingProduct.count > 1) {
//           existingProduct.count -= 1;
//         } else {
//           state.cart = state.cart.filter(
//             (order) => order.variant.id !== action.payload.id
//           );
//         }
//       }
//     },
//     deleteFromCart(state, action: PayloadAction<ProductVariant>) {
//       state.cart = state.cart.filter(
//         (order) => order.variant.id !== action.payload.id
//       );
//     },
//     removeItemsWithZeroCount(state) {
//       state.cart = state.cart.filter((order) => order.count > 0);
//     },

//     clearCart(state) {
//       state.cart = [];
//     },
//   },
// });

// export const selectProductVariantCount = (
//   state: RootState,
//   variantId: number
// ) => {
//   const existingProduct = state.cart.cart.find(
//     (order) => order.variant.id === variantId
//   );

//   return existingProduct ? existingProduct.count : 0;
// };

// export const getCart = (state: RootState) => {
//   return state.cart.cart;
// };

// export const getTotalCartUniqueItems = (state: RootState) => {
//   return state.cart.cart.length;
// };

// export const getTotalCost = (state: RootState) => {
//   const totalCost = state.cart.cart.reduce((sum, order) => {
//     return sum + order.variant.price! * order.count;
//   }, 0);

//   return totalCost;
// };
// export const productIsInCart = (state: RootState, productId: number) => {
//   const existingProduct = state.cart.cart.find(
//     (order: Order) => order.product.id === productId
//   );

//   return existingProduct ? true : false;
// };
// export const {
//   addToCart,
//   removeFromCart,
//   clearCart,
//   setProductCount,
//   removeItemsWithZeroCount,
//   deleteFromCart,
// } = cartSlice.actions;
// export default cartSlice.reducer;
