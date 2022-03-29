import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createNewAlert } from './alertReducer'

const initialState = {
  id: null,
  token: null,
  username: null,
  name: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logout(state, action) {
      window.localStorage.clear()
      blogService.setToken(null)
      return initialState
    },
  },
})

export const { setUser, logout } = authSlice.actions

export const initializeAuth = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      dispatch(createNewAlert('Wrong credentials', 'error'))
    }
  }
}

export default authSlice.reducer
