import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout-item.styles.scss'

export default function CheckoutItem({ item }) {
  const { name, imageUrl, price, quantity } = item
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext)

  const handleClearItem = () => clearItemFromCart(item)

  const handleIncreaseItem = () => addItemToCart(item)

  const handleDecreaseItem = () => removeItemFromCart(item)

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecreaseItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncreaseItem}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={handleClearItem}>
        &#10005;
      </div>
    </div>
  )
}
