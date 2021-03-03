import React from 'react'
import { Modal, Button } from 'react-materialize';

function New(props) {
  
  return (
    <form>
      <Modal 
        trigger={<button className="btn">Edit</button>}
        actions={[<Button modal="close" onClick={()=>props.function.handleUpdate(props.post._id)}>Post</Button>]}
        // actions={[<Button modal="close" >Post</Button>]}
      >
          <p className="">Create a edit post</p>
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
            value={props.comment}
          />
      </Modal>
    </form>
  )
}

export default New
