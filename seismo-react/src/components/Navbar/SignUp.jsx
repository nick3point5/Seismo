import React, { Component } from 'react'
import { Modal, Button } from 'react-materialize';

export class SignUp extends Component {
  render() {
    return (
    <form action="">  
      <Modal 
        trigger={<span className="nav-item text-shadow">SignUp</span>}
        actions={[<Button flat modal="close" node="button" waves="green" onClick={()=>this.props.function.handleSignUp()}>SignUp</Button>]}
      >
            <p className="">SignUp</p>
            <div className="input-field">
            </div>
            <label htmlFor="">Username</label>
            <br></br>
            <input 
              type="textarea" 
              name="name" 
              id="name" 
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
            <label htmlFor="">Confirm</label>
            <br></br>
            <input 
              type="textarea" 
              name="confirm" 
              id="confirm" 
              onChange={this.props.function.handleChange} 
              autoComplete="off"
            />
            <br></br>
      </Modal>
    </form> 
    )
  }
}

export default SignUp
