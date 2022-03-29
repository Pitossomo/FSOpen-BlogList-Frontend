import React, { useEffect } from 'react'
import Alerts from './components/Alerts'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Greetings from './components/Greetings'
import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAuth } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.auth)
  console.log(loggedUser)

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <div>
      <h1>Blogs</h1>

      <Greetings />

      <Alerts />

      {loggedUser && loggedUser.username !== null ? (
        <Toggable buttonLabel='New blog...'>
          <BlogForm />
        </Toggable>
      ) : (
        <LoginForm />
      )}

      <Blogs />
    </div>
  )
}

export default App
