import React from 'react'
import { Modal, Button } from 'react-materialize';

function New(props) {
  
  return (
    <form>
      <Modal 
        trigger={<div className="material-icons btn-floating btn-large">+</div>}
        actions={[<Button modal="close" onClick={()=>props.function.handleNew(props.user)}>Post</Button>]}
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
            onChange={props.function.handleChange} 
            autoComplete="off"
          />
      </Modal>
    </form>
  )
}

export default New
