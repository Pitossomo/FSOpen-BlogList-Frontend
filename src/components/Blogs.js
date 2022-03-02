import React from "react"
import Blog from "./Blog"

const Blogs = ({blogs, setBlogs}) => {
  return (
    <div>
      <h2>blogs</h2>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
      )}
    </div>
  )
}

export default Blogs