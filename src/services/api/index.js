import ky from 'ky'

let _token

function url() {
  if (process.env.API_BASE) return process.env.API_BASE
  const port = process.env.API_PORT
  return port
    ? `${window.location.protocol}//${window.location.hostname}:${port}/api/v2`
    : '/api/v2'
}

export function setToken(token) {
  _token = token
}

const api = ky.extend({
  prefixUrl: url(),
  hooks: {
    beforeRequest: [
      options => {
        options.headers.Authorization = _token ? `Bearer ${_token}` : undefined
        return options
      }
    ]
  }
})

export default api
