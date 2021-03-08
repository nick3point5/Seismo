import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import './navbar.css'
import Auth from './Auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import logo from '../../assets/logo_small.png'
import NewForm from '../PostsComponents/PostFormsComponents/NewForm'

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

export class Navbar extends Component {
  state = {
    user: null,
    loggedIn:false,
    comment:''
  }

  componentDidMount(){
    // if (auth.currentUser) {
    //   this.handle.login(auth.currentUser)
    // }
  }

  componentDidUpdate() {
    // if (this.state.loggedIn) {
    //   console.log('asdfasdf')
      
    //   this.handle.login(auth.currentUser)
    // }
  }

  handle={
    login:(user)=>{
      const obj = {
        username: user.displayName,
        uid: user.uid,
        img: user.photoURL
      }
      this.setState({
        user: auth.currentUser,
        loggedIn:true
      })
  
      fetch(`http://localhost:4000/user/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          obj
        ),
      })
      .then((res)=>{
        return res.json();
      })
      .catch((err) => console.log(err));
    },
    logout:()=>{
      auth.signOut()
      this.setState({
        user: auth.currentUser,
        loggedIn:false
      })    
    },
    change:(event)=>{
      event.preventDefault();
      this.setState({
        [event.target.id]: event.target.value
      });
    },
    new:(user,postId='')=>{
      const obj = {
        comment: this.state.comment,
        author: user.displayName,
        ownerId: user.uid,
        img: user.photoURL,
      }
      
      
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
        })
        .catch((err) => console.log(err));
    }
  }

  render() {

    const postFunctions = {
      handleNew:this.handle.new,
      handleChange:this.handle.change,
    }    
    const authFunctions={
      handleLogin:this.handle.login,
      handleLogout:this.handle.logout,
    }
    return (



      <>
        <header>
          <nav className="flex-r">
            <Link to="/">
              <div className="flex-r">
                <img src={logo} alt='Seismo-Logo' className="logo-img"/>
                <h3 className="nav-name">Seismo</h3>
              </div>
            </Link>
            <div>
              <ul>
                {this.state.loggedIn?
                <>
                  <li>{<NewForm functions={postFunctions} comment={this.state.comment}/>}</li>
                  <li><Link to="/user/settings" className="btn">Settings</Link></li>
                  <li><Link to={`/user/${auth.currentUser?auth.currentUser.uid:''}`} className="btn">My Account</Link></li>
                </>:
                  ''}
                <li><Auth user={this.state.user} functions={authFunctions}/></li>
              </ul>
            </div>
          </nav>
        </header>
      </>
    )
  }
}


export default Navbar
