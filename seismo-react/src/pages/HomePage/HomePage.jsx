import React, { Component } from 'react'
import './homepage.css'
import Posts from '../../components/PostsComponents/Posts'

export class HomePage extends Component {
  state={
    posts: '',
  }
  
  componentDidMount(){
    this.fetchData()
  }

  fetchData=()=>{
    fetch(`http://localhost:4000/post/get10`,{
      method:'GET'
    })
      .then(res=>{
        return res.json()
      })
      .then(data=>{
        this.setState({
          topPosts: data
        })
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
      <div className="home-page content">
        <h1>Top Posts</h1>
        <Posts functions={postFunctions} posts={this.state.topPosts} />
      </div>
    )
  }
}



export default HomePage
