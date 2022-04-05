import { Box, List, ListItem, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((u) => u.id === id)

  if (!user) return null

  return (
    <Box>
      <Typography variant='h2'>{user.name}</Typography>
      <Typography variant='h3'>added blogs</Typography>
      <List>
        {user.blogs.map((u) => (
          <ListItem key={`b${u.id}`}>{u.title}</ListItem>
        ))}
      </List>
    </Box>
  )
}

export default UserView
