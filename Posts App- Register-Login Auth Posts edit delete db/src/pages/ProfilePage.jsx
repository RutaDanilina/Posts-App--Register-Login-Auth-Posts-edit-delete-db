import React from 'react'
import FilterPosts from '../components/FilterPosts'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import UserCard from '../components/UserCard'
import { post } from '../plugins/http'



const ProfilePage = () => {

  const [posts, setPosts] = React.useState([])

  React.useEffect( ()=> {
    const getPosts = async() => {
      const res = await post('find', {username: ""})
      setPosts(res.posts)
    }
    getPosts()
  }, [])

  const postRemoved = (id) => {
    let myPosts = [...posts]
    myPosts = myPosts.filter(myPost => myPost._id !== id)
    setPosts(myPosts)
  }




  return (
    <div className='shopPageWrapper'>
      <Navbar />
      <UserCard />

      <div className='postsWrapper'>
          <FilterPosts setPosts={setPosts} />

          <div style={{ display: 'flex', flexWrap:'wrap' }}>
              {posts.map((post,i) =>  <PostCard key={i} post={post} postRemoved={postRemoved} /> )}    
          </div>  
      </div>
    </div>
  )
}

export default ProfilePage