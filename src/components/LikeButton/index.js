import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../../reducers/blogReducer'

const LikeButton = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <Button className='likeBtn' onClick={handleLike}>
      like
    </Button>
  )
}

export default LikeButton
