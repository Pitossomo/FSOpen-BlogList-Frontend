import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setState(state, action) {
      return action.payload
    },
  },
})

export const { setState } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setState(users))
  }
}

export default userSlice.reducer
