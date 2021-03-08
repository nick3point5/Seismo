import React from 'react'
import { Modal, Button } from 'react-materialize';
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import { useAuthState } from 'react-firebase-hooks/auth'
// import {  } from "../../context/firebaseInit";


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

function UpdateForm(props) {
  const [user]=useAuthState(auth)
  
  return (
    <form>
      <Modal 
        trigger={<Button className="btn">Change Profile</Button>}
        actions={[<Button modal="close" onClick={()=>{props.functions.handleUpdate(user)}}>Update</Button>]}
      >
          <p className="">Change Profile</p>
          <div className="input-field">
          </div>
          <label htmlFor="">Name</label>
          <br></br>
          <input 
            type="text"
            name="displayName" 
            id="displayName" 
            onChange={props.functions.handleChange} 
            autoComplete="off"
            value={props.displayName}
          ></input>
          <br/>
          <input 
            type="file"
            name="photo" 
            id="photo" 
            accept=".png, .jpg, .gif, .jpeg"
            onChange={props.functions.handleChange} 
          />
      </Modal>
    </form>
  )
}

export default UpdateForm
