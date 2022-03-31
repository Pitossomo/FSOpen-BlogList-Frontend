import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import Toggable from './Toggable'

const Blogs = () => {
  const loggedUser = useSelector((state) => state.auth)
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      {loggedUser && loggedUser.username !== null ? (
        <Toggable buttonLabel='New blog...'>
          <BlogForm />
        </Toggable>
      ) : (
        <LoginForm />
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default Blogs
