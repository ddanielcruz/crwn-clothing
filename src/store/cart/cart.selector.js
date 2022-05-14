import { createSelector } from 'reselect'

const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
)

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
)

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((count, item) => count + item.quantity, 0)
)

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((count, item) => count + item.quantity * item.price, 0)
)
