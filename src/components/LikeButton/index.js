import React from 'react'
import blogService from '../../services/blogs'

const LikeButton = ({ blog, blogs, setBlogs }) => {
  const like = () => {
    blogService.like(blog)

    const blogsUpdated = blogs.map(b => {
      return b.id === blog.id
        ? { ...b, likes: b.likes+1 }
        : b
    })

    setBlogs(blogsUpdated)
  }

  return (<button className='likeBtn' onClick={like}>like</button>)
}

export default LikeButton