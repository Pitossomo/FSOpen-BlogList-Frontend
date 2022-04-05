import { createTheme, ThemeProvider } from '@mui/material'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import alertReducer from './reducers/alertReducer'
import authReducer from './reducers/authReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    alerts: alertReducer,
    auth: authReducer,
    users: userReducer,
  },
})

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1.2rem',
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '0.7rem',
    },
  },
  Link: {
    defaultProps: {
      variant: 'body2',
    },
  },
  spacing: 8,
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
