import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../store/cart/cart.selector'

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles'
import { useCallback } from 'react'
import { setIsCartOpen } from '../../store/cart/cart.actions'

const CartDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(selectCartItems)

  const goToCheckoutHandler = useCallback(() => {
    navigate('/checkout')
    dispatch(setIsCartOpen(false))
  }, [navigate, dispatch])

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
