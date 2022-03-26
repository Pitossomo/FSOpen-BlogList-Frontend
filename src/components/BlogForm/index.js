import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createNewBlog(newBlog))
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          <label>title</label>
          <input
            type='text'
            name='title'
            id='titleInput'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <label>author</label>
          <input
            type='text'
            name='author'
            id='authorInput'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <label>url</label>
          <input
            type='text'
            name='url'
            id='urlInput'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button id='newBlogBtn' type='submit'>
          Add
        </button>
      </form>
    </div>
  )
}

export default BlogForm
