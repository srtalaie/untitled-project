import { useState } from 'react'

const Blog = ({ blog, handleUpdate, handleRemove }) => {
  const [isVisible, setIsVisible] = useState(false)

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
      handleRemove(blog._id)
    }
  }

  return (
    <div>
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
              likes: {blog.likes} <button onClick={handleLike}>+Like</button>
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
