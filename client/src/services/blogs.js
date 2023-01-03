import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const commentedBlog = await axios.get(`${baseUrl}/${id}`)
  const comments = commentedBlog.data[0].comments
  comments.push(comment)
  const blogWithComment = { ...commentedBlog.data[0],
    comments: comments
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogWithComment, config)
  console.log(response.data)
  return response.data
}

export { getAll, setToken, create, update, remove, addComment }
