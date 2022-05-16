import { FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.actions'

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton
} from './checkout-item.styles'
import { CartItem } from '../../store/cart/cart.types'

type CheckoutItemProps = {
  item: CartItem
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ item }) => {
  const { name, imageUrl, price, quantity } = item
  const cartItems = useSelector(selectCartItems)
  const dispatch = useDispatch()

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, item))
  const addItemHandler = () => dispatch(addItemToCart(cartItems, item))
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, item))

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
})

export default CheckoutItem
