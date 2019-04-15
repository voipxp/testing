import axios from 'axios'

export const api = axios.create({})

api.interceptors.response.use(
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

export function setToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.Authorization
  }
}

export function setBaseUrl(url) {
  api.defaults.baseURL = url
}
