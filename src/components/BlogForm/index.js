import { Box, Button, FormGroup, TextField, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useTextField } from '../../hooks'
import { createNewBlog } from '../../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const title = useTextField('title')
  const author = useTextField('author')
  const url = useTextField('url')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    dispatch(createNewBlog(newBlog))
  }

  return (
    <Box>
      <Typography variant='h2'>Add new blog</Typography>
      <FormGroup onSubmit={handleNewBlog}>
        <TextField {...title} />
        <TextField {...author} />
        <TextField {...url} />
        <Button variant='contained' size='medium' id='newBlogBtn' type='submit'>
          Add
        </Button>
      </FormGroup>
    </Box>
  )
}

export default BlogForm
