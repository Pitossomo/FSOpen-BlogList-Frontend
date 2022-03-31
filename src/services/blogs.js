import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const like = async (blog) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/like`)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const comment = async (blog, text) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comment`, {
    comment: text,
  })
  return response.data
}

const blogService = { setToken, getAll, create, like, remove, comment }
export default blogService
