import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { createAUser } from '../reducers/userReducer'

const UserForm = () => {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      name,
      username,
      email,
      password,
    }

    try {
      dispatch(createAUser(newUser))
      dispatch(setNotification('You successfully created a new user.', 3000))
    } catch (exception) {
      dispatch(setNotification('Something went wrong'))
    }

    setName('')
    setUsername('')
    setEmail('')
    setPassword('')
    navigate('/login')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input
            type="text"
            value={name}
            name="Name"
            id="name"
            placeholder="Full Name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            placeholder="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          email address
          <input
            type="text"
            value={email}
            name="Email"
            id="email"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            placeholder="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="submit-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default UserForm