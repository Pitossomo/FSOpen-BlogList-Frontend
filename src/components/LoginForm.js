import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewAlert } from '../reducers/alertReducer'
import blogsService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (exception) {
      dispatch(addNewAlert('Wrong credentials', 'error'))
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default LoginForm
