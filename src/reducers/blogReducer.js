import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      return state.map((e) => (e.id === blog.id ? blog : e))
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
    const blogCreated = await blogService.create(newBlog)
    dispatch(addElement(blogCreated))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogLiked = await blogService.like(blog)
    dispatch(updateElement(blogLiked))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(removeElement(blog))
  }
}

export default blogSlice.reducer
