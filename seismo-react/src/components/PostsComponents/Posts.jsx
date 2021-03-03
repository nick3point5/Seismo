import React from 'react'
import './posts.css'
import EditForm from '../FormsComponents/EditForm'
import ReplyForm from '../FormsComponents/ReplyForm'


function Posts(props) {  
  let posts = ''
  
  if (props.posts) {
    posts = props.posts.map(post =>{
      const date =new Date(post.createdAt)
      const formattedDate =formatDate(date)
      return (
        <div className="post-card flex-r" key={post._id}>
          <img src={post.img} alt="" className="post-img"/>
          <div className="card-content flex-c">
            <p className="content">{post.comment}</p>
            <div className="card-footer flex-r">
              <div className="card-stats flex-r">
                <p className="user">{post.author}</p>
                <p className="post-date">{formattedDate}</p>
                <p className="mag">Magnitude: {post.magnitude}</p>
              </div>
              <div className="post-action flex-r">
                {props.user?
                    props.user.uid===post.ownerId?
                      <>
                        <EditForm function={props.functions} post={post}/>
                        <button className="btn red" onClick={()=>props.functions.handleDelete(post._id)}>Delete</button>
                      </>:
                        <ReplyForm function={props.functions} user={props.user} post={post}/>:
                  <></>
                }
              </div>
            </div>
          </div>
        </div>)
    })
  }
  return (
    <>
      {posts}
    </>
  )
}

function formatDate(date) {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
  const result = new Intl.DateTimeFormat('en-US', options).format(date)
  
  return result
}

export default Posts
