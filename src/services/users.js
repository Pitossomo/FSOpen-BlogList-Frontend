import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const userService = { getAll }
export default userService
