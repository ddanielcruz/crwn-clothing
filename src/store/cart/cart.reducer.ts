import { AnyAction } from 'redux'
import { setCartItems, setIsCartOpen } from './cart.actions'
import { CartItem } from './cart.types'

export type CartState = {
  isCartOpen: boolean
  cartItems: CartItem[]
}

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: []
}

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
  if (setIsCartOpen.match(action)) {
    return { ...state, isCartOpen: action.payload }
  } else if (setCartItems.match(action)) {
    return { ...state, cartItems: action.payload }
  }

  return state
}
