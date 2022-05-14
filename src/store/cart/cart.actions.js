import { createAction } from '../../utils/reducer/reducer.utils'
import { CART_ACTION_TYPES } from './cart.types'

export const setIsCartOpen = (value) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value)

export const addItemToCart = (cartItems, product) => {
  const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
  itemsMap[product.id] = itemsMap[product.id] || { ...product, quantity: 0 }
  itemsMap[product.id].quantity++

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, Object.values(itemsMap))
}

export const removeItemFromCart = (cartItems, item) => {
  const itemsMap = cartItems.reduce((map, item) => ({ ...map, [item.id]: item }), {})
  itemsMap[item.id].quantity--

  if (!itemsMap[item.id].quantity) {
    delete itemsMap[item.id]
  }

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, Object.values(itemsMap))
}

export const clearItemFromCart = (cartItems, itemToRemove) => {
  const newCartItems = cartItems.filter((item) => item.id !== itemToRemove.id)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}
