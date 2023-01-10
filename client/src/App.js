import { useEffect, useRef, useState } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'

import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setToken } from './services/blogs'
import login from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setToken(null)
  }

  return (
    <div>
      <h1>Blogger</h1>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogOut}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" id="new-blog-btn" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      )}
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
