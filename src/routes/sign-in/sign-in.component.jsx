import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

export default function SignIn() {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    console.log(response)
  }

  return (
    <div>
      <button onClick={logGoogleUser}>Sign In</button>
    </div>
  )
}
