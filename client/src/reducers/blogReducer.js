import { createSlice } from '@reduxjs/toolkit'
import { create, getAll } from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const blog = action.payload
      state.push({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: 0,
      })
    },
    likeBlog(state, action) {
      const id = action.payload.id
      const blogToChange = state.find((blog) => blog.id === id)
      const likedBlog = {
        ...blogToChange,
        likes: (blogToChange.likes += 1),
      }
      state.map((blog) => (blog.id !== id ? blog : likedBlog))
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog: (state, action) => {
      let id = action.payload
      return state.filter(blog => blog._id !== id)
    },
  },
})

export const { likeBlog, appendBlog, setBlogs, removeBlog  } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
