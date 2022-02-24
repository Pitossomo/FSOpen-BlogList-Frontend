import React from "react";

const handleNewBlog = () => {
  console.log('TODO - submit new blog')
}

const BlogForm = () => (
  <div>
    <h2>Add new blog</h2>
    <form onSubmit={handleNewBlog}>
      
      <div>
        <label>title</label>
        <input type='text' name='title'/>
      </div>

      <div>
        <label>author</label>
        <input type='text' name='author'/>
      </div>

      <div>
        <label>url</label>
        <input type='text' name='url'/>
      </div>

      <button type='submit'>Add</button>
    </form>
  </div>
)

export default BlogForm