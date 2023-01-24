import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { createAUser } from '../reducers/userReducer'

import { Button, FormControl, Grid, TextField } from '@mui/material'

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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '80vh' }}
    >
      <Grid item>
        <h2>New User</h2>
        <form onSubmit={handleSubmit}>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                value={name}
                name="Name"
                id="name"
                label="Full Name"
                onChange={({ target }) => setName(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                value={username}
                name="Username"
                id="username"
                label="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                value={email}
                name="Email"
                id="email"
                label="Email"
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={'auto'}>
            <FormControl margin={'normal'}>
              <TextField
                InputLabelProps={{ shrink: true }}
                required
                type={'password'}
                value={password}
                name="Password"
                id="password"
                label="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormControl>
          </Grid>
          <Button variant="outlined" type="submit" id="submit-btn">Create</Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default UserForm