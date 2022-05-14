import { createContext, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer.utils'

export const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  setIsCartOpen: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {}
})

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, isCartOpen: payload }
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const { isCartOpen, cartItems, cartCount, cartTotal } = state

  const updateCartItemsReducer = (cartItems) => {
    let cartCount = 0
    let cartTotal = 0

    cartItems.forEach((item) => {
      cartCount += item.quantity
      cartTotal += item.quantity * item.price
    })

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems,
        cartCount,
        cartTotal
      })
    )
  }

  const addItemToCart = (product) => {
    const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
    itemsMap[product.id] = itemsMap[product.id] || { ...product, quantity: 0 }
    itemsMap[product.id].quantity++

    updateCartItemsReducer(Object.values(itemsMap))
  }

  const removeItemFromCart = (item) => {
    const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
    itemsMap[item.id].quantity--

    if (!itemsMap[item.id].quantity) {
      delete itemsMap[item.id]
    }

    updateCartItemsReducer(Object.values(itemsMap))
  }

  const clearItemFromCart = (itemToRemove) => {
    const newCartItems = cartItems.filter((item) => item.id !== itemToRemove.id)
    updateCartItemsReducer(newCartItems)
  }

  const setIsCartOpen = (value) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value))
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
