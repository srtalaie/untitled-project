import { createSlice } from '@reduxjs/toolkit'

import { getAllUsers } from '../services/users'

const initialState = ''

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  }
})

export const { setUsers  } = userSlice.actions

export const initializeUsers = () => {
  return async dispatch => {getAllUsers
    const blogs = await getAllUsers()
    dispatch(setUsers(blogs))
  }
}

export const { createNotif, removeNotif } = userSlice.actions
export default userSlice.reducer