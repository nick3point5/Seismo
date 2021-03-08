import React from 'react'
import { Link } from 'react-router-dom';
import './profile.css'
import logo from '../../assets/logo_small.png'
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

export default function Profile(props) {
  // console.log(props.following);
  let profile = ''
  if (props.profile) {
    profile=profileCard(props.profile,auth.currentUser,props.followers,props.following,props.functions)
  }
  return (
    profile
  )
}

function profileCard(profile,user,followers,following,functions) {


  function followersComp() {
    return (
      <div className="followers">
        <h3>Followers</h3>
        {followers?followers.map(follower=>{
          return (
            <Link to={`/user/${follower.uid}`} key={follower.uid}>
              <img src={follower.img||logo} alt="" className="user-icon" title={follower.username}/>
            </Link>
          )
        }):""}
      </div>
    )
  }

  function followingComp() {
    return (
      <div className="following">
        <h3>Following</h3>
        {following?following.map(follow=>{
          return (
            <Link to={`/user/${follow.uid}`} key={follow.uid}>
              <img src={follow.img||logo} alt="" className="user-icon" title={follow.username}/>
            </Link>
          )
        }):""}
      </div>
    )
  }
  
  function checkFollowers(followers){
    if(followers){
      for (let i = 0; i < followers.length; i++) {
        if (followers[i].uid === user.uid) {
          return true
        }
      }
    }
    return false
  }
  

  
  if (!user || (user.uid === profile.uid && followers)) {
    return (
      <div className="profile-card">
        <img src={profile.img||logo} alt=""/>
        <h1>{profile.username}</h1>
        <p>{profile.about}</p>
        {followersComp()}
        {followingComp()}
      </div>
    )
      
  }else{
  return (
    <div className="profile-card">
      <img src={profile.img||logo} alt=""/>
      <h1>{profile.username}</h1>
      <p>{profile.about}</p>
      {checkFollowers(followers)?
        <button className="btn" onClick={()=>{
          functions.handleUnFollow(user)
        }}>UnFollow</button>:
        <button className="btn" onClick={()=>{
          functions.handleFollow(user)
        }}>Follow</button>
      }
      {followersComp()}
      {followingComp()}
    </div>
  )
  }
}
