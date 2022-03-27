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
      const blogs = state.concat(action.payload)
      return sortByLikes(blogs)
    },
    updateElement(state, action) {
      const blog = action.payload
      const blogs = state.map((b) => (b.id === blog.id ? blog : b))
      return sortByLikes(blogs)
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

export const { addElement, updateElement, removeElement, setState } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setState(blogs))
  }
}

export const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    dispatch(addElement(newBlog))
    const blogCreated = await blogService.create(newBlog)
    dispatch(
      createNewAlert(`New blog created: ${blogCreated.title}`, 'success')
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateElement(newBlog))
    await blogService.like(blog)
    dispatch(createNewAlert(`You like ${blog.title}`, 'success'))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    dispatch(removeElement(blog))
    await blogService.remove(blog)
    dispatch(createNewAlert(`You removed: ${blog.title}`, 'attention'))
  }
}

export default blogSlice.reducer
