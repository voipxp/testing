import axios from 'axios'

export const api = axios.create({ baseURL: '/api/v2' })

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

export const setBaseUrl = url => {
  api.defaults.baseURL = url
}

export const setToken = token => {
  api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null
}

export default api
