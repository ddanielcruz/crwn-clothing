import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setIsCartOpen } from '../../store/cart/cart.actions'
import { selectCartItems } from '../../store/cart/cart.selector'
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles.jsx'

export default function CartDropdown() {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const navigate = useNavigate()

  const goToCheckoutHandler = () => {
    navigate('checkout')
    dispatch(setIsCartOpen(false))
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empty.</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}
