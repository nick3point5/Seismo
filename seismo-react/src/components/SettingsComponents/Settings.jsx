import React from 'react'
// import logo from '../../assets/logo_small.png'
import 'firebase/auth'
import firebase from 'firebase/app'
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


function Settings() {
  const [user]=useAuthState(auth)
  if (user) {
      return (
    <div className="user-settings-container">
      {user.displayName}
      <img src={user.photoURL} alt="" srcset=""/>
    </div>
    )
  }else{
    return <div></div>
  }

}

export default Settings
