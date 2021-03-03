import React from 'react'
import { Modal, Button } from 'react-materialize';

function New(props) {
  console.log(props.post._id);
  return (
    <form>
      <Modal 
        trigger={<button className="btn">Reply</button>}
        actions={[<Button modal="close" onClick={()=>props.function.handleNew(props.user,props.post._id)}>Post</Button>]}
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