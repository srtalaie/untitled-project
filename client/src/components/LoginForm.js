import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
  }

  const onLogin = (event) => {
    event.preventDefault()

    const user = {
      username,
      password,
    }

    handleLogin(user)

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">
          login
        </button>
      </form>
      <div>
        <Button><Link to="/create-user">New User?</Link></Button>
      </div>
    </div>
  )
}

export default LoginForm
