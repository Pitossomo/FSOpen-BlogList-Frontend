import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((u) => (
          <li key={`b${u.id}`}>{u.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
