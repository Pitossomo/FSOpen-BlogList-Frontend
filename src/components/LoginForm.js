import React, { useState } from "react"
import blogsService from "../services/blogs"
import loginService from '../services/login'

const LoginForm = ({setUser, setErrorMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      
      blogsService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        
        <div>
          <label>username</label>
          <input
            type='text' name='username'
            value={username}
            onChange={({target}) => setUsername(target.value)}          
          />
        </div>

        <div>
          <label>password</label>
          <input
            type='password' name='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm