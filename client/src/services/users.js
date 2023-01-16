import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getUser = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const createUser = async (userObj) => {
  const request = await axios.post(baseUrl, userObj)
  return request.data
}

export { getAllUsers, getUser, createUser }
