import { createContext, useState, useReducer, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  if (existingCartItem) {
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
  }
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  )
}

const removeCheckoutItem = (cartItems, cartItemToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  removeItemFromCheckout: () => { },
  cartCount: 0,
  totalPrice: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useReducer((state) => !state, false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd))
  }
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove))
  }

  const removeItemFromCheckout = (cartItemToRemove) => {
    setCartItems(removeCheckoutItem(cartItems, cartItemToRemove))
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, item) => item.quantity + acc, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((acc, item) => item.quantity * item.price + acc, 0)
    setTotalPrice(newTotalPrice)
  }, [cartItems])

  const value = {
    isCartOpen,
    setIsCartOpen, cartItems,
    addItemToCart,
    cartCount,
    totalPrice,
    removeItemFromCart,
    removeItemFromCheckout
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}