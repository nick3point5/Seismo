import React from 'react'
import { Modal, Button } from 'react-materialize';
import firebase from 'firebase/app'
import 'firebase/auth'
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

function New(props) {
  const [user]=useAuthState(auth)  
  return (
    <form>
      <Modal 
        trigger={<Button className="btn">+Post</Button>}
        actions={[<Button modal="close" onClick={()=>props.functions.handleNew(user)}>Post</Button>]}
      >
          <p className="">Create a new post</p>
          <div className="input-field">
          </div>
          <label htmlFor="">Comment</label>
          <br></br>
          <textarea 
            type="textarea" 
            name="comment" 
            id="comment" 
            onChange={props.functions.handleChange} 
            autoComplete="off"
            value={props.comment}
            minLength="1"
            maxLength="200"
            required
          >
            {props.comment}
          </textarea>
      </Modal>
    </form>
  )
}

export default New
