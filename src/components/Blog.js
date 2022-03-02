import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({blog, setBlogs, blogs}) => {
  const [showDetails, setShowDetails] = useState(false)

  const detailsStyle = { display: showDetails ? '' : 'none' }

  const toggleDetails = () => setShowDetails(!showDetails)
  const like = () => { 
    blogsService.like(blog)

    const blogsUpdated = blogs.map(b => {
      return b.id === blog.id 
        ? { ...b, likes: b.likes+1 }
        : b
    })

    setBlogs(blogsUpdated)
    
    // REMOVED sorting when liking a blog 
    // setBlogs(blogsUpdated.sort((a,b) => b.likes - a.likes))

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleDetails}>
          {showDetails ? "hide" : "show"}
        </button>
        <button onClick={like}>like</button>
        <div style={detailsStyle} >
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <p>{blog.user.name}</p>
        </div>
      </div>
    </div>
  )  
}

export default Blog