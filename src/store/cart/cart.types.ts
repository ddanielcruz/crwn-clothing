import { CategoryItem } from '../categories/categories.types'

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN'
}

export type CartItem = CategoryItem & {
  quantity: number
}

export type CartItemMap = { [key: string]: CartItem }
