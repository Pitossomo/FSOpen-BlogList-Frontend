import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/authReducer'

const Greetings = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  if (user && user.username !== null)
    return (
      <>
        <Typography variant='body2'>Hello, {user.username}</Typography>
        <Button
          variant='outlined'
          color='secondary'
          size='small'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </>
    )

  return (
    <Button>
      <Link to='/login'>Log In</Link>
    </Button>
  )
}

export default Greetings
