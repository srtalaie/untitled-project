import { createSlice } from '@reduxjs/toolkit'
import { addComment, create, getAll, remove, update } from '../services/blogs'

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
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog._id
      return state.map(blog => blog._id !== id ? blog : updatedBlog)
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

export const { updateBlog, appendBlog, setBlogs, removeBlog  } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createABlog = (blog) => {
  return async dispatch => {
    const newBlog = await create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const updateABlog = (id, blog) => {
  return async dispatch => {
    const updatedBlog = await update(id, blog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteABlog = (id) => {
  return async dispatch => {
    await remove(id)
    dispatch(removeBlog(id))
  }
}

export const addAComment = (id, comment) => {
  return async dispacth => {
    const commentedBlog = await addComment(id, comment)
    dispacth(updateBlog(commentedBlog))
  }
}

export default blogSlice.reducer
