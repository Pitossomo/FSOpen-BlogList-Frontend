import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/authReducer'

const Greetings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  if (user && user.username !== null)
    return (
      <div>
        <p>Hello, {user.username}</p>
        <button onClick={handleLogout}>
          <small>Logout</small>
        </button>
      </div>
    )

  return null
}

export default Greetings
