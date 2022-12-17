import { createSlice } from '@reduxjs/toolkit'

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

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
        id: generateId(),
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
    }
  },
})

export const { createBlog, likeBlog, appendBlog, setBlogs  } = blogSlice.actions

export default blogSlice.reducer
