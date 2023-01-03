import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, handleUpdate }) => {
  const [isVisible, setIsVisible] = useState(false)

  const dispatch = useDispatch()

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: (blog.likes += 1),
    }

    handleUpdate(updatedBlog._id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Really delete ${blog.title} by ${blog.author}?`)) {
      try{
        dispatch(removeBlog(blog._id))
        dispatch(setNotification(`${blog.title} by ${blog.author} was deleted`, 3000))
      } catch (exception) {
        dispatch(setNotification('Something went wrong'))
      }
    }
  }

  return (
    <div className="blog">
      {blog.title} - {blog.author}
      <button id="view-hide-btn" onClick={handleVisibility}>
        {isVisible ? 'hide' : 'view'}
      </button>
      <div id="details">
        {isVisible ? (
          <>
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
            <button onClick={handleDelete}>delete</button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Blog
