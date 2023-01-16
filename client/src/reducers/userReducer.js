import { createSlice } from '@reduxjs/toolkit'

import { createUser, getAllUsers } from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
  }
})

export const { setUsers, appendUser  } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await getAllUsers()
    dispatch(setUsers(users))
  }
}

export const createAUser = (user) => {
  return async dispatch => {
    const newUser = await createUser(user)
    dispatch(appendUser(newUser))
  }
}

export default userSlice.reducer