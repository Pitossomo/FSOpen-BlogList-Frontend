import {
  Box,
  Button,
  Card,
  CardContent,
  Input,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { commentBlog, removeBlog } from '../reducers/blogReducer'
import LikeButton from './LikeButton'

const BlogView = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth)

  const handleNewComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog, e.target.newComment.value))
  }

  const handleDelete = async () => {
    if (window.confirm('Do you REALLY want to DELETE this blog?')) {
      dispatch(removeBlog(blog))
    }
  }

  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) return null

  return (
    <Card className='blogCard'>
      <CardContent>
        <Typography variant='h3' className='mainInfo'>
          {blog.title}, <i>{blog.author} </i>
        </Typography>
        <div>
          <Typography variant='body1' className='url'>
            {blog.url}
          </Typography>
          <Typography variant='body1' className='likes'>
            Likes: {blog.likes}
            <LikeButton blog={blog} />
          </Typography>
          <Typography variant='body1' className='creatorName'>
            added by {blog.user.name}
          </Typography>
          {user && user.username === blog.user.username ? (
            <Button className='deleteBtn' onClick={handleDelete}>
              delete
            </Button>
          ) : null}
        </div>
        <div>
          <Typography variant='h3'>Comments</Typography>
          <form onSubmit={handleNewComment}>
            <Input name='newComment' type='text' />
            <Button type='submit'>add comment</Button>
          </form>
          {blog.comments ? (
            <List>
              {blog.comments.map((c, i) => (
                <ListItem key={`com${i}`}>{c}</ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

export default BlogView
