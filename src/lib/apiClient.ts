import axios from 'axios'
import { HOST_API } from '../config'

const apiClient = axios.create({
  baseURL: HOST_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default apiClient