import { Box, Container, ListItem } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <Box>
      {blogs.map((blog) => (
        <ListItem>
          <Blog key={blog.id} blog={blog} />
        </ListItem>
      ))}
    </Box>
  )
}

export default Blogs
