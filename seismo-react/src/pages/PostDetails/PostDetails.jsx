import React, { Component } from 'react'
import Posts from '../../components/PostsComponents/Posts'
import { withRouter } from "react-router";
import './details.css'


export class Details extends Component {

  state={
    id:this.props.match.params.id
  }

  componentDidMount(){
    this.fetchData(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.id) {
      this.fetchData(this.props.match.params.id)
      this.setState({
        id:this.props.match.params.id
      })
    }
  }
  fetchData=(post_id)=>{
    fetch(`http://localhost:4000/post/${post_id}`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        this.setState({
          post: data
        })
      })
      .catch((err) => console.log(err));
      fetch(`http://localhost:4000/post/getposts/${post_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            replies: ''
          })
          if (data.length>1) {
            this.setState({
              replies: data
            })
          } else if (data.length === 1) {
            this.setState({
              replies: data[0]
            })
          }

        })
        .catch((err) => console.log(err));
    
  }

  handle={
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
    },
    delete:(postId) => {
      fetch(`http://localhost:4000/post/${postId}`, {
        method: 'DELETE',
      })
      .then((response) => {
        return response.json();
      })
      .then(() => {
      })
      .catch((err) => console.log(err));
    },
    follow:(user)=>{
      const obj={
        id: user.uid
      }
      
      fetch(`http://localhost:4000/user/follow/${this.state.profile._id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            obj
          ),
        })
        .then((res) => {
          return res.json()
        })
        .then((data)=>{
          
          if (!data.message) {
            this.setState({
              followers: data
            })
          }else{
            console.log(data)
          }
        })
        
        .catch((err) => console.log(err));
    },
    unFollow:(user)=>{
      const obj={
        id: user.uid
      }
      
      
      fetch(`http://localhost:4000/user/unfollow/${this.state.profile._id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            obj
          ),
      })
        .then((res) => {
          return res.json()
        })
        .then((data)=>{
          
          if (!data.message) {
            this.setState({
              followers: data
            })
          }else{
            console.log(data)
          }
  
        })
  
        .catch((err) => console.log(err));
    }
  }

  render() {
    const postFunctions = {
      handleNew:this.handle.new,
      handleChange:this.handle.change,
      handleDelete:this.handle.delete,
      handleUpdate:this.handle.update,
      fetchData:this.fetchData
    }

    return (
      
      <div className="post-details-page content">
        <div className="post-original">
          <Posts functions={postFunctions} posts={this.state.post}/>
        </div>
        {this.state.replies?
        <div className="replies">
          <Posts functions={postFunctions} posts={this.state.replies}/>
        </div>:
          <></>
        }
      </div>
    )
  }
}


export default withRouter(Details)
