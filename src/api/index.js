import axios from 'axios'
import hash from 'object-hash'

const http = axios.create({ baseURL: '/api/v2' })

http.interceptors.response.use(
  response => response.data,
  error => {
    let err
    if (error.response) {
      err = new Error(error.response.data.error || error.response.data)
      err.status = error.response.status
    } else if (error.request) {
      err = new Error(error.request.message)
      err.status = 503
    } else {
      err = error
      err.status = 500
    }
    return Promise.reject(err)
  }
)

export const setToken = token => {
  if (token) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete http.defaults.headers.common.Authorization
  }
}

export const setBaseUrl = url => {
  http.defaults.baseURL = url
}

// avoid simultaneous get calls with same params
const inflight = new Map()
const get = (url, options = {}) => {
  const key = hash({ url, ...options })
  if (!inflight.get(key)) {
    inflight.set(
      key,
      http.get(url, options).finally(setTimeout(() => inflight.delete(key)))
    )
  }
  return inflight.get(key)
}

const post = (url, data, options) => http.post(url, data, options)
const put = (url, data, options) => http.put(url, data, options)
const destroy = (url, data, options) => http.delete(url, data, options)

export const api = { get, post, put, delete: destroy }
export default api
