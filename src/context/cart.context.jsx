// import { createContext, useReducer } from "react";
// import { createAction } from '../utils/reducer/reducer.utils'

// const addCartItem = (cartItems, productToAdd) => {
//   const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

//   if (existingCartItem) {
//     return cartItems.map((cartItem) => cartItem.id === productToAdd.id
//       ? { ...cartItem, quantity: cartItem.quantity + 1 }
//       : cartItem
//     )
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }]
// }

// const removeCartItem = (cartItems, cartItemToRemove) => {
//   const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

//   if (existingCartItem.quantity === 1) {
//     return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
//   }
//   return cartItems.map((cartItem) =>
//     cartItem.id === cartItemToRemove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   )
// }

// const removeCheckoutItem = (cartItems, cartItemToRemove) => {
//   return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
// }

// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => { },
//   cartItems: [],
//   addItemToCart: () => { },
//   removeItemFromCart: () => { },
//   removeItemFromCheckout: () => { },
//   cartCount: 0,
//   totalPrice: 0,
// })

// const CART_ACTION_TYPES = {
//   SET_CART_ITEMS: 'SET_CART_ITEMS',
//   SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
// }

// const INITIAL_STATE = {
//   isCartOpen: false,
//   cartItems: [],
//   cartCount: 0,
//   totalPrice: 0,
// }

// const cartReducer = (state, action) => {
//   const { type, payload } = action

//   switch (type) {
//     case CART_ACTION_TYPES.SET_CART_ITEMS:
//       return {
//         ...state,
//         ...payload
//       };
//     case CART_ACTION_TYPES.SET_IS_CART_OPEN:
//       return {
//         ...state,
//         isCartOpen: payload
//       }
//     default:
//       throw new Error(`unhandled type of ${type} in carReducer`)
//   }
// }

// export const CartProvider = ({ children }) => {
//   const [{ cartItems, cartCount, totalPrice, isCartOpen }, dispatch] = useReducer(cartReducer, INITIAL_STATE)

//   const updateCartItemsReducer = (newCartItems) => {
//     const newCartCount = newCartItems.reduce((acc, item) => item.quantity + acc, 0)
//     const newTotalPrice = newCartItems.reduce((acc, item) => item.quantity * item.price + acc, 0)

//     dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
//       cartItems: newCartItems,
//       cartCount: newCartCount,
//       totalPrice: newTotalPrice
//     }))
//   }

//   const addItemToCart = (productToAdd) => {
//     const newCarItems = addCartItem(cartItems, productToAdd)
//     updateCartItemsReducer(newCarItems)
//   }

//   const removeItemFromCart = (cartItemToRemove) => {
//     const newCarItems = removeCartItem(cartItems, cartItemToRemove)
//     updateCartItemsReducer(newCarItems)
//   }

//   const removeItemFromCheckout = (cartItemToRemove) => {
//     const newCarItems = removeCheckoutItem(cartItems, cartItemToRemove)
//     updateCartItemsReducer(newCarItems)
//   }

//   const setIsCartOpen = (bool) => {
//     dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
//   }

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     cartItems,
//     addItemToCart,
//     cartCount,
//     totalPrice,
//     removeItemFromCart,
//     removeItemFromCheckout
//   }

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   )
// }