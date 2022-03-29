import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { createNewAlert } from './alertReducer'

const initialState = []

const sortByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    addElement(state, action) {
      const blog = action.payload
      const blogs = state.concat(blog)
      return sortByLikes(blogs)
    },
    updateElement(state, action) {
      const blog = action.payload
      const blogs = state.map((b) => (b.id === blog.id ? blog : b))
      return sortByLikes(blogs)
    },
    updatePlaceholder(state, action) {
      const preId = action.payload.preId
      const blog = action.payload.blog
      const blogs = state.map((b) => (b.id === preId ? blog : b))
      return blogs
    },
    removeElement(state, action) {
      const blog = action.payload
      const blogsUpdated = state.filter((b) => b.id !== blog.id)
      return blogsUpdated
    },
    setState(state, action) {
      return sortByLikes(action.payload)
    },
  },
})

export const {
  addElement,
  updateElement,
  updatePlaceholder,
  removeElement,
  setState,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setState(blogs))
    } catch (error) {
      dispatch(
        createNewAlert(
          'Sorry for it, blogs could not be retrieved from the server.'
        )
      )
    }
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    // Request the server to create the new blog
    try {
      const blogCreated = await blogService.create(newBlog)
      console.log('blogCreated: ', blogCreated)
      dispatch(
        createNewAlert(`New blog created: ${blogCreated.title}`, 'success')
      )
      console.log(blogCreated)
      dispatch(addElement(blogCreated))
    } catch (error) {
      console.log(error)
      dispatch(
        createNewAlert('Failed to create this blog, please try again.', 'error')
      )
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateElement(newBlog))
    try {
      await blogService.like(blog)
      dispatch(createNewAlert(`You like ${blog.title}`, 'success'))
    } catch (error) {
      dispatch(createNewAlert('Something went wrong :´(', 'error'))
      // in caso of error, remove the preliminar blog (created previously) from the state
      dispatch(updateElement(blog))
    }
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(removeElement(blog))
    try {
      await blogService.remove(blog)
      dispatch(createNewAlert(`You removed: ${blog.title}`, 'attention'))
    } catch (error) {
      addElement(blog)
      dispatch(createNewAlert('This blog could not be deleted', 'attention'))
    }
  }
}

export default blogSlice.reducer
