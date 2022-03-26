import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: [],
  type: null, // success, error or attention
  timeout: null,
}

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert(state, action) {
      clearTimeout(state.timeout)
      const messages = action.payload.messages
      const messagesArray = typeof messages === 'string' ? [messages] : messages
      return {
        ...action.payload,
        messages: messagesArray,
      }
    },
    resetAlert(state, action) {
      return initialState
    },
  },
})

export const { setAlert, resetAlert } = alertSlice.actions

const newAlert = (messages, type, timeInSeconds, dispatch) => {
  return {
    messages,
    type,
    timeout: setTimeout(() => dispatch(resetAlert()), timeInSeconds * 1000),
  }
}

export const addNewAlert = (
  messages,
  type = 'attention',
  timeInSeconds = 10
) => {
  return (dispatch) => {
    const alert = newAlert(messages, type, timeInSeconds, dispatch)
    dispatch(setAlert(alert))
  }
}

export default alertSlice.reducer
