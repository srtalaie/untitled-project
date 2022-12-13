/* eslint-disable indent */
const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG': {
      const id = action.data.id
      const blogToChange = state.find((blog) => blog.id === id)
      const likedBlog = {
        ...blogToChange,
        likes: (blogToChange.likes += 1),
      }
      return state.map((blog) => (blog.id !== id ? blog : likedBlog))
    }
    default:
      return state
  }
}

export default blogReducer
