import React from 'react'

const Greetings = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user && user.username)
    return (
      <div>
        <p>Hello, {user.username}</p>
        <button onClick={logout}>
          <small>Logout</small>
        </button>
      </div>
    )

  return null
}

export default Greetings
