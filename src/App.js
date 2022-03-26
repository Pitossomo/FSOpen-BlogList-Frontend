import React, { useState, useEffect } from 'react'
import Alerts from './components/Alerts'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Greetings from './components/Greetings'
import blogService from './services/blogs'
import Toggable from './components/Toggable'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState({
    ERROR: [],
    SUCCESS: [],
  })

  const addMessage = (newMsg, type) => {
    const newMessages = { ...messages }
    newMessages[type] = messages[type].concat(newMsg)

    setMessages(newMessages)

    setTimeout(() => {
      setMessages({
        ERROR: [],
        SUCCESS: [],
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
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h1>Blogs</h1>

      <Greetings user={user} setUser={setUser} />

      <Alerts messages={messages} />

      {user === null ? (
        <LoginForm setUser={setUser} addMessage={addMessage} />
      ) : (
        <Toggable buttonLabel='New blog...'>
          <BlogForm addMessage={addMessage} />
        </Toggable>
      )}

      <Blogs user={user} addMessage={addMessage} />
    </div>
  )
}

export default App
