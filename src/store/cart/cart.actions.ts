import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils'
import { CategoryItem } from '../categories/categories.types'
import { CartItem, CartItemMap, CART_ACTION_TYPES } from './cart.types'

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>

export const setIsCartOpen = withMatcher((value: boolean): SetIsCartOpen => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, value)
})

export const setCartItems = withMatcher((items: CartItem[]): SetCartItems => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, items)
})

export const addItemToCart = (cartItems: CartItem[], product: CategoryItem): SetCartItems => {
  const itemsMap = cartItems.reduce<CartItemMap>((map, item) => ({ ...map, [item.id]: item }), {})
  itemsMap[product.id] = itemsMap[product.id] || { ...product, quantity: 0 }
  itemsMap[product.id].quantity++

  return setCartItems(Object.values(itemsMap))
}

export const removeItemFromCart = (cartItems: CartItem[], item: CartItem): SetCartItems => {
  const itemsMap = cartItems.reduce<CartItemMap>((map, item) => ({ ...map, [item.id]: item }), {})
  itemsMap[item.id].quantity--

  if (!itemsMap[item.id].quantity) {
    delete itemsMap[item.id]
  }

  return setCartItems(Object.values(itemsMap))
}

export const clearItemFromCart = (cartItems: CartItem[], itemToRemove: CartItem): SetCartItems => {
  const newCartItems = cartItems.filter((item) => item.id !== itemToRemove.id)
  return setCartItems(newCartItems)
}
