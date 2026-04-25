import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  withCredentials: true, // required: sends the httpOnly auth cookie on every request
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient