import React, { Component } from 'react'
import Posts from '../../components/PostsComponents/Posts'
import Profile from '../../components/ProfileComponents/Profile'
import { withRouter } from "react-router";

export class UserPage extends Component {
  state={
    id:this.props.match.params.id
  }

  componentDidMount(){
    this.fetchData.all(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (this.props.match.params.id !== this.state.id) {
      console.log('chafe')
      
      this.fetchData.all(this.props.match.params.id)
      this.setState({
        id:this.props.match.params.id
      })
    }
  }

  fetchData={
    user:(user_id)=>{
      fetch(`http://localhost:4000/user/${user_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            profile: data
          })
        })
    },
    followers:(user_id)=>{
      fetch(`http://localhost:4000/user/getfollowers/${user_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            followers: data
          })
        })
    },
    following:(user_id)=>{
      fetch(`http://localhost:4000/user/getfollowing/${user_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            following: data
          })
        })
    },
    userPosts:(user_id)=>{
      fetch(`http://localhost:4000/user/getposts/${user_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            recentPosts: data,
          })
        })
    },
    feedTime:(user_id)=>{
      fetch(`http://localhost:4000/user/feedtime/${user_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            feedTimePost: data
          })
        })
    },
    feedMag:(user_id)=>{
      fetch(`http://localhost:4000/user/feedmag/${user_id}`,{
        method:'GET'
      })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          this.setState({
            feedMagPost: data
          })
        })
    },
    all:(user_id)=>{
      this.fetchData.user(user_id)
      this.fetchData.userPosts(user_id)
      this.fetchData.followers(user_id)
      this.fetchData.following(user_id)
      this.fetchData.feedTime(user_id)
      this.fetchData.feedMag(user_id)
    }
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
    }

    const profileFunctions ={
      handleFollow:this.handle.follow,
      handleUnFollow:this.handle.unFollow,
      fetchFollowers:this.fetchData.followers,
    }
    
    
    
    return (
      
      <div className="user-page content">
        <div className="post-owner">
          <Profile functions={profileFunctions} profile={this.state.profile} followers={this.state.followers} following={this.state.following}/>
        </div>
        {this.state.recentPosts?
          <div className="recent-posts">
            <h1>Recent Posts</h1>
            <Posts functions={postFunctions} posts={this.state.recentPosts}/>
          </div>:
          <></>
        }
        {this.state.recentPosts?
          <div className="recent-posts">
            <h1>Recent Feed</h1>
            <Posts functions={postFunctions} posts={this.state.feedTimePost}/>
          </div>:
          <></>
        }
        {this.state.recentPosts?
          <div className="recent-posts">
            <h1>Magnitude Feed</h1>
            <Posts functions={postFunctions} posts={this.state.feedMagPost}/>
          </div>:
          <></>
        }

      </div>
    )
  }
}


export default withRouter(UserPage)
