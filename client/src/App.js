import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import NavMenu from './components/NavMenu'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import User from './components/User'
import UsersTable from './components/UsersTable'


import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setToken } from './services/blogs'
import login from './services/login'


const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
    navigate('/login')
  }

  return (
    <div>
      {user === null ? (
        <Link to="/login">login</Link>
      ) : (
        <div>
          <div>
            <NavMenu name={user.name} handleLogOut={handleLogOut} />
          </div>
          <Notification />
          <Togglable buttonLabel="new blog" id="new-blog-btn" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      )}
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path="/users" element={<UsersTable />} />
        <Route path="/users/:id" element={<User />} />
        <Route path='/login' element={<LoginForm handleLogin={handleLogin} />} />
      </Routes>
    </div>
  )
}

export default App
