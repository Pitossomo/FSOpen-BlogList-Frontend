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
      <span>
        Hello, {user.username}
        <button onClick={handleLogout}>
          <small>Logout</small>
        </button>
      </span>
    )

  return null
}

export default Greetings
