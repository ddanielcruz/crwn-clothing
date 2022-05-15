import { useStripe } from '@stripe/react-stripe-js'
import { useElements } from '@stripe/react-stripe-js'
import { CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles'

export default function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const currentUser = useSelector(selectCurrentUser) || {}
  const cartTotal = useSelector(selectCartTotal)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handlePayment = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    try {
      setIsProcessingPayment(true)
      const response = await fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: cartTotal * 100 })
      }).then((response) => response.json())

      const clientSecret = response.paymentIntent.client_secret
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser.displayName || 'Guest',
            email: currentUser.email
          }
        }
      })
      setIsProcessingPayment(false)

      if (paymentResult.error) {
        alert(paymentResult.error.message)
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        alert('Payment successful!')
      }
    } finally {
      setIsProcessingPayment(false)
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={handlePayment}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}
