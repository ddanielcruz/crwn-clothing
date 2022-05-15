import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { setIsCartOpen } from '../../store/cart/cart.actions'
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'

import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles'

export default function CartIcon() {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount className="item-count">{cartCount}</ItemCount>
    </CartIconContainer>
  )
}
