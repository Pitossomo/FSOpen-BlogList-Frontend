import { Button, Input, List, ListItem } from '@mui/material'
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
    <div className='blogCard'>
      <h2 className='mainInfo'>
        {blog.title}, <i>{blog.author} </i>
      </h2>
      <div>
        <p className='url'>{blog.url}</p>
        <p className='likes'>
          Likes: {blog.likes}
          <LikeButton blog={blog} />
        </p>
        <p className='creatorName'>added by {blog.user.name}</p>
        {user && user.username === blog.user.username ? (
          <Button className='deleteBtn' onClick={handleDelete}>
            delete
          </Button>
        ) : null}
      </div>
      <div>
        <h3>Comments</h3>
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
    </div>
  )
}

export default BlogView
