import React, { Component } from 'react'
import Settings from '../../components/SettingsComponents/Settings'
import UpdateForm from '../../components/SettingsComponents/UpdateForm'
import 'firebase/auth'
import firebase from 'firebase/app'


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

export class UserSettingsPage extends Component {

  state={
    photo:'',
    displayName: auth.currentUser?auth.currentUser.displayName:''
  }

  handle={
    change:(event)=>{
      event.preventDefault();
      if (event.target.files&&event.target.files[0]) {
        console.log(event.target.files[0])
        this.setState({  
          photo:event.target.files[0]
        });
      } else{
        this.setState({
          [event.target.id]:event.target.value
        });
      }
    },
    update:(user)=>{
      if (this.state.photo) {
        firebase.storage()
        .ref(`users/${user.uid}/profile.png`)
        .put(this.state.photo)
        .then((snapshot)=>{
          snapshot.ref.getDownloadURL()
            .then((downloadURL)=>{
              const updateObj={
                displayName: this.state.displayName,
                photoURL: downloadURL
              }
  
              user.updateProfile(
                updateObj
              )
  
              const obj = {
                username: this.state.displayName,
                img: downloadURL,
              }
              
              fetch(`http://localhost:4000/user/${user.uid}`,{
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(
                    obj
                  ),
                })
                .then(() => {
                  this.setState({
                    photo: ''
                  })
                })
                .catch((err) => console.log(err));
  
            })
            .catch(err=>console.log(err))
        })
        
      }else{
        const obj = {
          username: this.state.displayName,
        }
        fetch(`http://localhost:4000/user/${user.uid}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            obj
          ),
        })
        .then(() => {
          user.updateProfile(
            obj
          )
  
          this.setState({
            photo: ''
          })
        })
        .catch((err) => console.log(err));
  
      }
      
    }
  }  

  render() {

    const updateFunctions = {
      handleChange:this.handle.change,
      handleUpdate:this.handle.update,
    }

    return (
      <div>
        <Settings/>
        <UpdateForm functions={updateFunctions} displayName={this.state.displayName}/>
      </div>
    )
  }
}

export default UserSettingsPage
