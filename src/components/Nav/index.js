import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Greetings from '../Greetings'

const Nav = () => {
  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h1'>Blogs</Typography>
          <Button>
            <Link to='/users'>Users</Link>
          </Button>
          <Button>
            <Link to='/blogs'>Blogs</Link>
          </Button>
          <Greetings />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Nav
