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
    const blogCreated = await blogService.create(newBlog)
    dispatch(addElement(blogCreated))
    dispatch(
      createNewAlert(`New blog created: ${blogCreated.title}`, 'success')
    )
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogLiked = await blogService.like(blog)
    dispatch(updateElement(blogLiked))
    dispatch(createNewAlert(`You like ${blogLiked.title}`, 'success'))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(removeElement(blog))
    dispatch(createNewAlert(`You removed: ${blog.title}`, 'attention'))
  }
}

export default blogSlice.reducer
