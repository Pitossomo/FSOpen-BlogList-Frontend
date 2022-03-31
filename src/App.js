import React, { useEffect } from 'react'
import Alerts from './components/Alerts'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeAuth } from './reducers/authReducer'
import { initializeUsers } from './reducers/userReducer'
import Users from './components/Users'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(initializeAuth())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Blogs</h1>

      <Router>
        <Nav />

        <Alerts />

        {loggedUser && loggedUser.username !== null ? (
          <Toggable buttonLabel='New blog...'>
            <BlogForm />
          </Toggable>
        ) : (
          <LoginForm />
        )}

        <Routes>
          <Route path='/blogs/:id' element={<BlogView />} />
          <Route path='/users/:id' element={<UserView />} />
          <Route path='/users' element={<Users />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
