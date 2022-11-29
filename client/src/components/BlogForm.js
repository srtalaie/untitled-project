import { useState } from 'react'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title,
      author,
      url,
    }

    handleCreateBlog(newBlog)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            placeholder="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
