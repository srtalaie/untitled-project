import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, FormControl, Grid, TextField } from '@mui/material'

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item>
        <h2>Login</h2>
        <form onSubmit={onLogin}>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                type="text"
                value={username}
                name="Username"
                label="username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                type="password"
                value={password}
                name="Password"
                label="password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormControl>
          </Grid>
          <Button variant="outlined" id="login-btn" type="submit">login</Button>
        </form>
        <Grid item>
          <Button><Link to="/create-user">New User?</Link></Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LoginForm
