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
  const commentObj = {
    content: comment,
    date: Date.now()
  }
  const response = await axios.put(`${baseUrl}/${id}/comment`, commentObj, config)
  return response.data
}

const likeBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}/like`, {}, config)
  return response.data
}

export { getAll, setToken, create, update, remove, addComment, likeBlog }
