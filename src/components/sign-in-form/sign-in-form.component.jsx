import { useState } from 'react'

import {
  creteUserDocumentFromAuth,
  signInWithCredentials,
  signInWithGooglePopup
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-in-form.styles.scss'

const defaultFormFields = { email: '', password: '' }

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFormFields = () => setFormFields(defaultFormFields)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInWithCredentials(email, password)
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        return alert('Invalid credentials!')
      }

      console.log(`Error authenticating user: ${error}`)
    }
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup()
    await creteUserDocumentFromAuth(user)
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          onChange={handleChange}
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  )
}
