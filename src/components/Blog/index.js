import PropTypes from 'prop-types'
import React, { useState } from 'react'
import blogsService from '../../services/blogs'
import LikeButton from '../LikeButton'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const detailsStyle = { display: showDetails ? '' : 'none' }

  const toggleDetails = () => setShowDetails(!showDetails)

  const remove = async () => {
    if (window.confirm('Do you REALLY want to DELETE this blog?')) {
      await blogsService.remove(blog)
      const blogsUpdated = blogs.filter((b) => b.id !== blog.id)
      setBlogs(blogsUpdated)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blogCard' style={blogStyle}>
      <span className='mainInfo'> {blog.title}</span>, <i>{blog.author} </i>
      <button className='showDetailsBtn' onClick={toggleDetails}>
        {showDetails ? 'hide' : 'show'}
      </button>
      <LikeButton blog={blog} setBlogs={setBlogs} blogs={blogs} />
      <div style={detailsStyle}>
        <p className='url'>{blog.url}</p>
        <p className='likes'>Likes: {blog.likes}</p>
        <p className='creatorName'>{blog.user.name}</p>
        {user && user.username === blog.user.username ? (
          <button className='deleteBtn' onClick={remove}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
