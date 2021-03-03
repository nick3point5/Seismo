import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  })
}else {
  firebase.app(); // if already initialized, use that one
}

const auth =firebase.auth()

function Auth() {
  const [user]=useAuthState(auth)
  return (
    <>
      {user? <SignOut/>:<SignIn/>}
    </>
  )
}

function SignIn() {
  const signInWithGoogle=()=>{
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }
  
  return (
    <button onClick={signInWithGoogle} className="btn">Sign in with Google</button>
    )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={()=> auth.signOut()} className="btn">Sign Out</button>
  )
}

export default Auth
