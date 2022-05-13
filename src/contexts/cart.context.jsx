import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((count, item) => count + item.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (product) => {
    const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
    itemsMap[product.id] = itemsMap[product.id] || { ...product, quantity: 0 }
    itemsMap[product.id].quantity++

    setCartItems(Object.values(itemsMap))
  }

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
