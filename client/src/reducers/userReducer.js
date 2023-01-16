import { createSlice } from '@reduxjs/toolkit'

import { getAllUsers } from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

export const { setUsers  } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {getAllUsers
    const users = await getAllUsers()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer