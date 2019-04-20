import { api } from '..'

export const token = (username, password) => {
  return api.post('auth/token', { username, password })
}

export const refresh = () => api.put('auth/token')

export const password = (oldPassword, newPassword, userId) => {
  return api.put('auth/password', { userId, newPassword, oldPassword })
}

export const session = () => api.get('auth/session')

export default { token, refresh, password, session }
