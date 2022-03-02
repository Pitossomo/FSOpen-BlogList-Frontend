import React, { useState, useEffect } from 'react'
import Alerts from './components/Alerts'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Greetings from './components/Greetings'
import blogService from './services/blogs'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState(
    {
      ERROR: [],
      SUCCESS: []
    }
  )

  const addMessage = (newMsg, type) => {
    const newMessages = { ...messages }
    newMessages[type] = messages[type].concat(newMsg)

    setMessages(newMessages)
    
    setTimeout(() => {
      setMessages({
        ERROR: [],
        SUCCESS: []
      })
    }, 5000)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, []) 

  return (
    <div>
      <h1>Blogs</h1>

      <Greetings user={user} setUser={setUser} />

      <Alerts messages={messages} />
      
      { user === null
        ? <LoginForm setUser={setUser} addMessage={addMessage} />
        : <Toggable buttonLabel="New blog ...">
            <BlogForm addMessage={addMessage} blogs={blogs} setBlogs={setBlogs} />
          </Toggable>
      }

      <Blogs blogs={blogs} setBlogs={setBlogs} />
    </div>
  )
}

export default App