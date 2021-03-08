import React from 'react'
import './posts.css'
import EditForm from './PostFormsComponents/EditForm'
import ReplyForm from './PostFormsComponents/ReplyForm'
import { Link } from 'react-router-dom';
import 'firebase/auth'
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import logo from '../../assets/logo_small.png'

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
  firebase.app();
}
const auth =firebase.auth()

function Posts(props) {  
  const [user]=useAuthState(auth)
  let posts = ''
  
  if (props.posts && props.posts.length>0) {
    posts = props.posts.map(post =>{
      return postJSX(post,user,props.functions)
    })
  }else if (props.posts) {
    return postJSX(props.posts,user,props.functions)
  }
  return (
    <>
      {posts}
    </>
  )
}

function formatDate(date) {
  if (!date) {
    return undefined
  } else{
    date = new Date(date)
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const result = new Intl.DateTimeFormat('en-US', options).format(date)
    
    return result
  }
}

function postJSX(post,user,functions){
  if (!post._id) {
    return <></>
  }else{

  const formattedDate =formatDate(post.createdAt)
  
  return (
    
    <div className="post-card flex-r" key={post._id}>
      <Link to={{ pathname: `/user/${post.ownerId}`, state: post }}>
        <img src={post.img||logo} alt="" className="post-img"/>
      </Link>
        <div className="card-content flex-c">
        <Link to={{ pathname: `/post/${post._id}`, state: post }}>
          <p className="text-content">{post.comment}</p>
        </Link>
        {post.parent?
          <Link to={{ pathname: `/post/${post.parent}`, state: post }}>
            <p className="">Reply of...</p>
          </Link>:
          ""
        }
        <div className="card-footer flex-r">
          <div className="card-stats flex-r">
            <p className="user">{post.author}</p>
            <p className="post-date">{formattedDate}</p>
            <p className="mag">Replies: {post.reply.length}</p>
            <p className="mag">Magnitude: {post.magnitude}</p>
          </div>
          <div className="post-action flex-r">
            {user?
              user.uid===post.ownerId?
                <>
                  <EditForm function={functions} post={post}/>
                  <button className="btn red" onClick={()=>functions.handleDelete(post._id)}>Delete</button>
                </>:
                  <ReplyForm function={functions} user={user} post={post}/>:
              <></>
            }
          </div>
        </div>
      </div>
    </div>
  )
  }
}

export default Posts
