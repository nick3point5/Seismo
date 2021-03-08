import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Modal, Button } from 'react-materialize';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useAuthState } from 'react-firebase-hooks/auth'

// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID
//   })
// }else {
//   firebase.app();
// }

const auth =firebase.auth()

function Auth(props) {
  const [user]=useAuthState(auth)
  
  if (user !== props.user && user) {
    props.functions.handleLogin(user)
  }

  return (
    <>
      {user? <SignOut functions={props.functions}/>:<SignIn/>}
    </>
  )
}

function SignOut(props) {
  
  return auth.currentUser && (
    <div className="">
      <button onClick={()=> {props.functions.handleLogout()}} className="btn">Sign Out</button>
    </div>
  )
}

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};

function SignIn() {

  return (
    <Modal 
      trigger={<div className="btn">SignIn</div>}
      actions={<Button modal="close" className="btn">X</Button>}
    >

    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    </Modal>
  )
}

export default Auth
