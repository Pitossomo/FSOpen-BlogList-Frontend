import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog } from '../../reducers/blogReducer'
import LikeButton from '../LikeButton'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  const [showDetails, setShowDetails] = useState(false)

  const detailsStyle = { display: showDetails ? '' : 'none' }

  const toggleDetails = () => setShowDetails(!showDetails)

  const handleDelete = async () => {
    if (window.confirm('Do you REALLY want to DELETE this blog?')) {
      dispatch(removeBlog(blog))
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
      <LikeButton blog={blog} />
      <div style={detailsStyle}>
        <p className='url'>{blog.url}</p>
        <p className='likes'>Likes: {blog.likes}</p>
        {blog.user !== null ? (
          <p className='creatorName'>{blog.user.name}</p>
        ) : null}
        {user && user.username === blog.user.username ? (
          <button className='deleteBtn' onClick={handleDelete}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
}

export default Blog
