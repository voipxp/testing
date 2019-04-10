import axios from 'axios'

let token

const api = axios.create({ baseURL: apiUrl() })

export function apiUrl() {
  if (process.env.API_BASE) return process.env.API_BASE
  const port = process.env.API_PORT
  return port
    ? `${window.location.protocol}//${window.location.hostname}:${port}/api/v2`
    : '/api/v2'
}

export function setToken(_token) {
  token = _token
}

async function send(config) {
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  try {
    const response = await api.request(config)
    return response.data
  } catch (error) {
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
    throw err
  }
}

function get(url, params) {
  return send({ method: 'GET', url, params })
}

function post(url, data, params) {
  return send({ method: 'POST', url, data, params })
}

function put(url, data, params) {
  return send({ method: 'PUT', url, data, params })
}

function destroy(url, data, params) {
  return send({ method: 'DELETE', url, data, params })
}

export default { get, post, put, delete: destroy }
