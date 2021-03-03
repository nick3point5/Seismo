// import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import './navbar.css'
// import Login from './Login'
// import SignUp from './SignUp'
import Auth from './Auth'
// import firebase from 'firebase/app'
import 'firebase/auth'
import logo from '../../assets/Seismo_logo.png'


// const auth =firebase.auth()

export class Navbar extends Component {
  state = {

  }

  handleLogin=()=>{
    const obj = {
      name:this.state.name,
      password:this.state.password,
    }
    console.log(obj)
    
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
    .then((data)=>{
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  handleSignUp=()=>{
    const obj = {
      name:this.state.name,
      password:this.state.password,
      confirm:this.state.confirm,
    }
    console.log(obj)
    
    fetch(`http://localhost:4000/user/`,{
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
    .then((data)=>{
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  handleChange=(event)=>{
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  test=()=>{
    fetch(`http://localhost:4000/user/`,{
      method: 'GET',
    })
    .then((res)=>{
      return res.json();
    })
    .then((data)=>{
      console.log(data);
    })
    .catch((err) => console.log(err));
  }

  render() {
/*     const loginFunctions = {
      handleLogin:this.handleLogin,
      handleChange:this.handleChange
    }

    const signUpFunctions = {
      handleSignUp:this.handleSignUp,
      handleChange:this.handleChange
    } */

    
    // handleSignUp
    return (
      <>
        <header>
          <nav className="flex-r">
            <div className="flex-r">
              <img src={logo} alt='Seismo-Logo' className="logo-img"/>
              <h3 className="nav-name">Seismo</h3>
            </div>
            <div>
              <ul>
                {/* <li><Login state={this.state} function={loginFunctions}/></li>
                <li><SignUp state={this.state} function={signUpFunctions}/></li> */}
                <li><Auth/></li>
              </ul>
            </div>
          </nav>
        </header>
      </>
    )
  }
}


export default Navbar
