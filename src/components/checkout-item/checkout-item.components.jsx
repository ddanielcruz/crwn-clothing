import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.actions'
import { selectCartItems } from '../../store/cart/cart.selector'
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value
} from './checkout-item.styles'

export default function CheckoutItem({ item }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const { name, imageUrl, price, quantity } = item

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
}
