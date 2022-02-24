import React, { useState, useEffect } from 'react'
import ErrorMessages from './components/ErrorMessages'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Greetings from './components/Greetings'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []) 

  return (
    <div>
      <h1>Blogs</h1>

      <Greetings user={user} setUser={setUser} />

      <ErrorMessages errorMessages={errorMessages} />
      
      { user === null
        ? <LoginForm setUser={setUser} setErrorMessages={setErrorMessages} />
        : <BlogForm />
      }

      <Blogs blogs={blogs} />
    </div>
  )
}

export default App