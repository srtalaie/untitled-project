import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { addAComment, deleteABlog, updateABlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const { id } = useParams()

  const blog = useSelector((state) => state.blogs.find(blog => blog._id === id))

  const handleLike = () => {
    try{
      dispatch(updateABlog(blog._id, { ...blog, likes: blog.likes + 1 }))
      dispatch(setNotification(`You liked: ${blog.title} by ${blog.author}`, 3000))
    } catch (exception) {
      dispatch(setNotification('Something went wrong'))
    }
  }

  const handleDelete = () => {
    if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
      try{
        dispatch(deleteABlog(blog._id))
        dispatch(setNotification(`${blog.title} by ${blog.author} was deleted`, 3000))
      } catch (exception) {
        dispatch(setNotification('Something went wrong'))
      }
    }
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleComment = async () => {
    dispatch(addAComment(blog._id, comment))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      {blog.title} - {blog.author}
      <div id="details">
        <div className="blog-link">
              link:
          <a
            href={`http://${encodeURI(blog.url)}`}
            target="_blank"
            rel="noreferrer"
          >
            {blog.url}
          </a>
        </div>
        <div className="blog-likes">
              likes: {blog.likes}
          <button className="like-btn" onClick={handleLike}>
                +Like
          </button>
        </div>
        <div>
          <h3>Comments</h3>
          <input type="text" name="comment" value={comment} onChange={handleChange}></input>
          <button onClick={handleComment}>Add Comment</button>
          <div>
            {blog.comments.length === 0 ?
              <div>No comments yet</div> :
              <ul>
                {blog.comments.map(comment => <li key={`${comment._id}`}>{comment.content} - {new Date(comment.date).toLocaleString('en-US', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}</li>)}
              </ul>
            }
          </div>
        </div>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  )
}

export default Blog
