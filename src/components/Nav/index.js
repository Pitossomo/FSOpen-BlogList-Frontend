import { Link } from 'react-router-dom'
import Greetings from '../Greetings'

const Nav = () => {
  return (
    <nav>
      <Link to='/users'>Users</Link>
      <Link to='/blogs'>Blogs</Link>
      <Greetings />
    </nav>
  )
}

export default Nav
