import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => setShowDetails(!showDetails)

  const detailsStyle = { display: showDetails ? '' : 'none' }

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
        <button onClick={toggleDetails}>view</button>
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