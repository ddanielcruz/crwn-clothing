import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCOZMq4NyfpYW7c1LtufeOllqn_NC58pWE',
  authDomain: 'crwn-clothing-abfa9.firebaseapp.com',
  projectId: 'crwn-clothing-abfa9',
  storageBucket: 'crwn-clothing-abfa9.appspot.com',
  messagingSenderId: '945195526518',
  appId: '1:945195526518:web:b9c4242e123e740744b257'
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Setup auth
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
