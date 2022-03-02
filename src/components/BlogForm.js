import React, { useState } from "react";
import blogsServices from "../services/blogs";

const BlogForm = ({addMessage, setBlogs, blogs}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = () => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    
    blogsServices
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')   
      }
    )

     
  }

  return (
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleNewBlog}>
        
        <div>
          <label>title</label>
          <input 
            type='text' name='title'
            value={title}
            onChange={({target}) => setTitle(target.value)}        
          />
        </div>

        <div>
          <label>author</label>
          <input
            type='text' name='author'
            value={author}
            onChange={({target}) => setAuthor(target.value)}        
          />
          
        </div>

        <div>
          <label>url</label>
          <input 
            type='text' name='url'
            value={url}
            onChange={({target}) => setUrl(target.value)}        
          />
        </div>

        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default BlogForm