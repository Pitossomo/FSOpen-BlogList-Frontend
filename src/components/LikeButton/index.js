import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../../reducers/blogReducer'

const LikeButton = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <button className='likeBtn' onClick={handleLike}>
      like
    </button>
  )
}

export default LikeButton
