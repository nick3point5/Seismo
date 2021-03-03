import React, { Component } from 'react'
import Posts from '../components/PostsComponents/Posts'
import 'firebase/auth'
import NewForm from '../components/FormsComponents/NewForm'
import firebase from 'firebase/app'
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
  firebase.app();
}
const auth =firebase.auth()

function UserControls(props) {
  const [user]=useAuthState(auth)

  if(auth.currentUser){
    
  }
  
  return (
    <>
      {user?<NewForm user= {user} function={props.functions}/>:<></>}
      <h1>Top Posts</h1>
      <Posts user={user} posts={props.posts} functions={props.functions}/>
    </>
  )
}

export class HomePage extends Component {
  state={
    posts: '',
  }
  
  componentDidMount(){
    this.fetchData()
    // this.setState(initUser)
    
  }

  fetchData=(location_id=null)=>{
    fetch(`http://localhost:4000/post/get10`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        this.setState({
          topPosts: data
        })
      })
      .catch((err) => console.log(err));
  }

  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleNew=(user,postId='')=>{
    console.log(user);
    
    const obj = {
      comment: this.state.comment,
      author: user.displayName,
      ownerId: user.uid,
      img: user.photoURL,
    }
    console.log(obj);
    
    
    fetch(`http://localhost:4000/post/${postId}`,{
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          obj
        ),
      })
      .then((res)=>{
        this.setState({
          comment:''
        })
      }
      )
      .catch((err) => console.log(err));
  }

  handleUpdate=(postId)=>{
    const obj = {
      comment: this.state.comment,
    }
    
    fetch(`http://localhost:4000/post/${postId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          obj
        ),
      })
      .then(() => {
        this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  }

  handleDelete = (postId) => {
      fetch(`http://localhost:4000/post/${postId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        const stateCopy = {...this.state}
        const updatedState = stateCopy.topPosts.filter((post) => {
          return postId !== post._id
        })
        this.setState({
          topPosts: updatedState
        })
      })
      .catch((err) => console.log(err));
  }

  render() {

    const postFunctions = {
      handleNew:this.handleNew,
      handleChange:this.handleChange,
      handleDelete:this.handleDelete,
      handleUpdate:this.handleUpdate
    }
    if(this.state.user !== auth.currentUser){
      this.setState(
      { user:auth.currentUser}
      )
    }

    return (
      <div>
        <UserControls functions={postFunctions} posts={this.state.topPosts}/>
      </div>
    )
  }
}



export default HomePage
