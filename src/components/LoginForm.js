import { Card, Container } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <Card>
      <h2>Log in to application</h2>
      <form id='loginForm' onSubmit={handleLogin}>
        <div>
          <label>username</label>
          <input
            type='text'
            name='username'
            id='usernameInput'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          <label>password</label>
          <input
            type='password'
            name='password'
            id='passwordInput'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button id='loginBtn' type='submit'>
          Login
        </button>
      </form>
    </Card>
  )
}

export default LoginForm
