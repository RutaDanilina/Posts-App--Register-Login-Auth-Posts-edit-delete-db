import React from 'react'
import { post} from "../plugins/http";


const FilterPosts = ({setPosts}) => {
    const searchRef = React.useRef()

    async function find() {
        const res = await post(`find`, {username: searchRef.current.value})
        setPosts(res.posts)
    }

    const getAllPosts = () => {
      post('allPosts').then(res => {
        setPosts(res.posts)
      })
    }


    return (
        <div className='searchForm'>
            <input ref={searchRef} type="text" placeholder="Find User"/>
            <button onClick={find}>Filter</button>
            <button onClick={getAllPosts} >All POSTS</button>
        </div>
    );
}

export default FilterPosts