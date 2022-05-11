import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/user.context'
import {
  createAuthUserWithEmailAndPassword,
  creteUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-up-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export default function SignUpForm() {
  const { setCurrentUser } = useContext(UserContext)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      return alert('Passwords do not match!')
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await creteUserDocumentFromAuth(user, { displayName })
      setCurrentUser(user)
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        return alert('Cannot create user, email already in use!')
      }

      console.error(`User creation encountered an error: ${error}`)
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          required
          onChange={handleChange}
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
