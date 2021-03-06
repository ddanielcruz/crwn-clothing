import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  UserCredential
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { Category } from '../../store/categories/categories.types'

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
export const signInWithCredentials = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signOutUser = () => signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback)

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void | UserCredential> => {
  if (email && password) {
    return await createUserWithEmailAndPassword(auth, email, password)
  }
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe()
        resolve(userAuth)
      },
      reject
    )
  })
}

// Setup database
export const db = getFirestore()

export type AdditionalInformation = {
  displayName?: string
}

export type UserData = {
  email: string
  displayName: string
  createdAt: Date
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {}
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
    } catch (error) {
      console.error(`Error creating the user: ${error}`)
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>
}

export type ObjectToAdd = {
  title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)

  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase())
    batch.set(docRef, obj)
  })

  await batch.commit()
  console.log('Batch is completed')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => doc.data() as Category)

  // return querySnapshot.docs.reduce((map, docSnapshot) => {
  //   const { title, items } = docSnapshot.data()
  //   return { ...map, [title.toLowerCase()]: items }
  // }, {})
}
