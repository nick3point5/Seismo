import React from 'react'
import { Modal, Button } from 'react-materialize';

function Edit(props) {
  
  return (
    <form>
      <Modal 
        trigger={<button className="btn">Edit</button>}
        actions={[<Button modal="close" onClick={()=>props.function.handleUpdate(props.post._id)}>Post</Button>]}
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
            minLength="1"
            maxLength="200"
            required
          >
            {props.comment}
          </textarea>
      </Modal>
    </form>
  )
}

export default Edit
