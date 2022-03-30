import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blogCard' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} className='mainInfo'>
        {blog.title}, <i>{blog.author}</i>
      </Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
}

export default Blog
