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

  console.log(blog)

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
          <button className='deleteBtn' onClick={handleDelete}>
            delete
          </button>
        ) : null}
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleNewComment}>
          <input name='newComment' type='text' />
          <button type='submit'>add comment</button>
        </form>
        {blog.comments ? (
          <ul>
            {blog.comments.map((c, i) => (
              <li key={`com${i}`}>{c}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}

export default BlogView
