import { Button, TextField } from '@mui/material'
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
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <TextField {...title} />
        </div>
        <div>
          <TextField {...author} />
        </div>
        <div>
          <TextField {...url} />
        </div>
        <Button id='newBlogBtn' type='submit'>
          Add
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
