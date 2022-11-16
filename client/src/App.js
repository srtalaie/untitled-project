import { useEffect, useRef, useState } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'

import { create, getAll, remove, setToken, update } from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  const sortBlogs = (blogs) => {
    blogs = blogs.sort((a, b) => b.likes - a.likes)
    return blogs
  }

  useEffect(() => {
    getAll().then((blogs) => setBlogs(sortBlogs(blogs)))
  }, [blogs])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (userCheck) => {
    try {
      const loggedInUser = await login(userCheck)

      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))

      setToken(loggedInUser.token)
      setUser(loggedInUser)
    } catch (error) {
      console.log(error)
      setMessage(error.response.data.message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setToken(null)
  }

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await create(newBlog)
      setMessage(
        `A new blog was created: ${newBlog.title} by ${newBlog.author}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Something went wrong')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleUpdate = async (blogID, updatedBlog) => {
    try {
      await update(blogID, updatedBlog)
      setMessage('Blog successfully updated')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Something went wrong')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (blogID) => {
    try {
      await remove(blogID)
      setMessage('Blog successfully deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Something went wrong')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h1>Blogger</h1>
      <div>
        <p>{message}</p>
      </div>
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in <button onClick={handleLogOut}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm handleCreateBlog={handleCreateBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog._id}
              blog={blog}
              handleUpdate={handleUpdate}
              handleRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
