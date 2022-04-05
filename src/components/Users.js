import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)
  console.log(users)

  return (
    <Box>
      <Typography variant='h1'>Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={`u${u.id}`}>
              <TableCell>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </TableCell>
              <TableCell>{u.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default Users
