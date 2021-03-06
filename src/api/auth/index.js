import { api } from '..'

export const token = (username, password) => {
  return api.post('auth/token', { username, password })
}

export const refresh = token => {
  const opts = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  return api.put('auth/token', null, opts)
}

export const tokenPassword = (oldPassword, newPassword, userId) => {
  return api.put('auth/token/password', { userId, newPassword, oldPassword })
}

export const password = (oldPassword, newPassword, userId) => {
  return api.put('auth/password', { userId, newPassword, oldPassword })
}

export const session = () => api.get('auth/session')

export const sso = partner => api.put(`auth/sso/${partner}`)

export default { token, tokenPassword, refresh, password, session, sso }
