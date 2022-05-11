import {
  signInWithGooglePopup,
  creteUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

export default function SignIn() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    await creteUserDocumentFromAuth(response.user)
  }

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In</button>
    </div>
  )
}
