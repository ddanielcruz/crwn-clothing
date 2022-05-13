import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((count, item) => count + item.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  useEffect(() => {
    const newTotal = cartItems.reduce((count, item) => count + item.quantity * item.price, 0)
    setCartTotal(newTotal)
  }, [cartItems])

  const addItemToCart = (product) => {
    const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
    itemsMap[product.id] = itemsMap[product.id] || { ...product, quantity: 0 }
    itemsMap[product.id].quantity++

    setCartItems(Object.values(itemsMap))
  }

  const removeItemFromCart = (item) => {
    const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
    itemsMap[item.id].quantity--

    if (!itemsMap[item.id].quantity) {
      delete itemsMap[item.id]
    }

    setCartItems(Object.values(itemsMap))
  }

  const clearItemFromCart = (itemToRemove) => {
    const newCartItems = cartItems.filter((item) => item.id !== itemToRemove.id)
    setCartItems(newCartItems)
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
