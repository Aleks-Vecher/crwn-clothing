import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBzFXn-_1I4Fvm7R0ZtakV7qwCTJfHIlfA",
  authDomain: "crwn-clothing-db-1c1f6.firebaseapp.com",
  projectId: "crwn-clothing-db-1c1f6",
  storageBucket: "crwn-clothing-db-1c1f6.appspot.com",
  messagingSenderId: "346782476730",
  appId: "1:346782476730:web:b5f22a858c0b5ecd8d9583"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef
}