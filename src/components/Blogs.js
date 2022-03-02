import React from "react"
import Blog from "./Blog"

const Blogs = ({blogs, setBlogs, user}) => {
  return (
    <div>
      <h2>blogs</h2>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} />
      )}
    </div>
  )
}

export default Blogs