import { initializeApp } from 'firebase/app';
import { getAuth,
   signInWithRedirect, 
   signInWithPopup, 
   GoogleAuthProvider
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { useRevalidator } from 'react-router-dom';
const firebaseConfig = {
  apiKey: "AIzaSyDcqkTIitqOoBwqX0fEiNqnTLUcMU52oBk",
  authDomain: "crwn-clothing-db-e0b2c.firebaseapp.com",
  projectId: "crwn-clothing-db-e0b2c",
  storageBucket: "crwn-clothing-db-e0b2c.appspot.com",
  messagingSenderId: "937062906462",
  appId: "1:937062906462:web:3c2ad7f9fdc36f79a3d2cf"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, provider );

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc( db, 'users', userAuth.uid );
  console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(
        userDocRef, {
        displayName,
        email,
        createdAt
      });
    }
    catch(err){
      console.log('error creating the user', err.message);
    }

    return userDocRef;
  };
}