import React, { Component } from 'react'
import { Modal, Button } from 'react-materialize';

export class Login extends Component {
  render() {
    return (
    <form action="">
      <Modal 
        trigger={<span className="nav-item text-shadow">Login</span>}
        actions={[<Button flat modal="close" node="button" waves="green" onClick={()=>this.props.function.handleLogin()}>Login</Button>]}
      >
            <p className="">Login</p>
            <div className="input-field">
            </div>
            <label htmlFor="">Username</label>
            <br></br>
            <input 
              type="textarea" 
              name="username" 
              id="username" 
              onChange={this.props.function.handleChange} 
              autoComplete="off"
            />
            <br></br>
            <label htmlFor="">Password</label>
            <br></br>
            <input 
              type="textarea" 
              name="password" 
              id="password" 
              onChange={this.props.function.handleChange} 
              autoComplete="off"
            />
            <br></br>
      </Modal>
    </form>    
    )
  }
}

export default Login
