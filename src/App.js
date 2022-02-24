import React, { useState, useEffect } from 'react'
import ErrorMessages from './components/ErrorMessages'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h1>Blogs</h1>

      { user?.username
        ? <p>Hello, {user.username}</p>
        : <p>Hello!</p>
      }

      <ErrorMessages errorMessages={errorMessages} />
      
      { console.log(user) }
      { user === null
        ? <LoginForm setUser={setUser} setErrorMessages={setErrorMessages} />
        : <BlogForm />
      }

      <Blogs blogs={blogs} />
    </div>
  )
}

export default App