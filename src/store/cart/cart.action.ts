import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from '../categories/category.types'
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CategoryItem) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const removeCheckoutItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean))
export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
)

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCarItems = addCartItem(cartItems, productToAdd)
  return setCartItems(newCarItems)
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCarItems = removeCartItem(cartItems, cartItemToRemove)
  return setCartItems(newCarItems)
}

export const removeItemFromCheckout = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCarItems = removeCheckoutItem(cartItems, cartItemToRemove)
  return setCartItems(newCarItems)
}