import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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
export const signInWithCredentials = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

// Setup database
export const db = getFirestore()

export const creteUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
    } catch (error) {
      console.error(`Error creating the user: ${error.message}`)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (email && password) {
    return await createUserWithEmailAndPassword(auth, email, password)
  }
}

export const signOutUser = () => signOut(auth)
