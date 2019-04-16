import { api } from '..'

function token(username, password) {
  return api.post('auth/token', { username, password })
}

function password(oldPassword, newPassword, userId) {
  return api.put('auth/password', { userId, newPassword, oldPassword })
}

function session() {
  return api.get('auth/session')
}

export default { token, password, session }
