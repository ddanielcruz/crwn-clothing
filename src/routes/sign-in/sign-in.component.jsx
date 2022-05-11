import Button from '../../components/button/button.component'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import {
  signInWithGooglePopup,
  creteUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

export default function SignIn() {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    await creteUserDocumentFromAuth(user)
  }

  return (
    <div>
      <Button onClick={logGoogleUser} buttonType="google">
        Sign In
      </Button>
      <SignUpForm />
    </div>
  )
}
